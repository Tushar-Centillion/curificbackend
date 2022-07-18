import { redBright, greenBright } from 'chalk';
import { roleModel } from '../models';
import { permissionService, roleService } from '../mongoServices';
import { errorLogger } from '../utils';
import roleData from './JSONData/Role.json';
const Role = async (data = roleData) => {
	try {
		let insertObj = {};
		for (const element of data) {
			const checkExistingRole = await roleService.roleQuery({
				name: element.name,
			});

			if (!checkExistingRole) {
				let filter = {},
					project = { _id: 1 },
					permission,
					skip = 0;

				insertObj = element;
				if (insertObj.name === 'DEVELOPER') {
					permission = await permissionService.findWithoutPage(filter, project);
				} else {
					skip = 4;
					permission = await permissionService.findWithSkip(
						filter,
						project,
						skip,
					);
				}
				const permissionArray = [];

				permission.map((x) => {
					permissionArray.push(x?._id);
				});

				insertObj = {
					...insertObj,
					isEnabled: true,
					permissions: permissionArray,
				};

				const role = new roleModel(insertObj);
				await role.save();
			} else {
				throw new Error('role is available');
			}
		}
		console.info(greenBright('Sowing seed completed for ROLe'));
	} catch (error) {
		errorLogger(error.message);
		console.error(redBright('error', error.message));
		return;
	}
};
export default Role;
