import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../schemes/user.js';
import MailService from './mail.js'
import TokenService from './token.js'
import UserDto from '../dtos/user.js'
import ApiError from '../exceptions/api-error.js';

class UserService {
  async registration(email, password){
    const candidate = await UserModel.findOne({email});
    if (candidate){
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const user = await UserModel.create({email, password: hashPassword, activationLink});
    const mailService = new MailService(process.env.SMTP_USER, process.env.SMTP_PASSWORD);
    await mailService.sendActivationLink(email, `${process.env.API_URL}/api/activate/${activationLink}`);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({...userDto});
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

  async activate (activationLink){
    const user = await UserModel.findOne({activationLink});
    if (!user) {
      throw ApiError.BadRequest('Неккоректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password){
    const user = await UserModel.findOne({email});
    if (!user){
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }
    const isPassEquals = bcrypt.compareSync(password, user.password);
    if (!isPassEquals){
      throw ApiError.BadRequest('Неверный пароль');
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({...userDto});
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = TokenService.validationRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({...userDto});
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }
}

export default new UserService();