import { redBright, greenBright, yellowBright } from 'chalk';
import { adminUserModel, permissionsModel, roleModel } from '../models';
import { adminUserService, roleService } from '../mongoServices';
import { hashPassword } from '../utils';
import userData from './JSONData/Users.json';

const Users = async (data = userData) => {
	try {
		let insertObj;
		data.forEach(async (element) => {
			console.info(yellowBright('Sowing seed for USERS'));
			const checkExistingUser = await adminUserService.userQuery({
				email: element.email,
			});

			if (checkExistingUser) {
				console.error(
					redBright(
						'Sowing seed Error => \nUser Credentials Already In Use',
						JSON.stringify({
							email: checkExistingUser.email,
						}),
					),
				);
				return;
			}
			if (!checkExistingUser) {
				insertObj = element;
				const getRole = await roleService.roleQuery({
					name: element.role,
				});
				if (getRole) {
					const { hashedPassword, salt } = await hashPassword(element.password);
					insertObj = {
						...element,
						hashedPassword: hashedPassword,
						salt,
						role: getRole?._id,
					};
					const user = new adminUserModel(insertObj);
					const userRes = await user.save();
					if (getRole.name === 'DEVELOPER') {
						let update = { createdBy: userRes._id };
						await roleModel.updateMany(update);
						await permissionsModel.updateMany(update);
						await adminUserModel.updateMany(update);
					}
				} else {
					throw new Error('please create role first');
				}
			}
			console.info(greenBright('Sowing seed completed for USERS'));
		});
	} catch (error) {
		errorLogger(error.message);
		console.error(redBright('error', error.message));
		return;
	}
};

export default Users;
