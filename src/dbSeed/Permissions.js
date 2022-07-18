import { redBright, greenBright } from 'chalk';
import { permissionsModel } from '../models';
import { permissionService } from '../mongoServices';
import { errorLogger } from '../utils';
import permissionData from './JSONData/Permission.json';
const Permissions = async (data = permissionData) => {
	try {
		for (const element of data) {
			const checkExistingPermissions = await permissionService.findWithoutPage({
				path: element.path,
			});
			if (checkExistingPermissions.length === 0) {
				const insertObj = new permissionsModel({
					...element,
				});
				await insertObj.save();
			}
		}

		console.info(greenBright('Sowing seed completed for Permissions'));
	} catch (error) {
		errorLogger(error.message);
		console.error(redBright('error', error.message));
		return;
	}
};
export default Permissions;
