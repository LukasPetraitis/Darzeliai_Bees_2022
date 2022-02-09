package it.akademija.compensationApplication;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.application.ApplicationStatus;
import it.akademija.compensationApplication.childData.ChildData;
import it.akademija.compensationApplication.childData.ChildDataInfo;
import it.akademija.compensationApplication.childData.ChildDataService;
import it.akademija.compensationApplication.kindergartenData.KindergartenData;
import it.akademija.compensationApplication.kindergartenData.KindergartenDataInfo;
import it.akademija.compensationApplication.kindergartenData.KindergartenDataService;
import it.akademija.user.User;
import it.akademija.user.UserInfo;
import it.akademija.user.UserService;

@Service
public class CompensationApplicationService {
	
	@Autowired
	private CompensationApplicationDAO compensationApplicationDAO;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private KindergartenDataService kindergartenDataService;
	
	@Autowired
	private ChildDataService childDataService;
	
	/**
	 * Create an compensation application for logged in user's child with specified child data.
	 * Receives and updates user data. Sets received
	 * main guardian, child data to kindergarten data to application.
	 * 
	 * @param currentUsername
	 * @param data
	 */
	@Transactional
	public void createNewCompensationApplication(CompensationApplicationDTO compensationApplicationDTO) {
		
		CompensationApplication compensationApplication = new CompensationApplication();
		
		compensationApplication.setSubmitedAt(LocalDate.now());
		compensationApplication.setApplicationStatus(ApplicationStatus.Pateiktas);
		
		User user = userService
				.getUserByUsername(compensationApplicationDTO.getMainGuardian().getUsername());
		
		compensationApplication.setMainGuardian(user);
		
		KindergartenData kindergartenData = kindergartenDataService
				.creteNewKindergartenData(compensationApplicationDTO.getKindergartenData());
		
		compensationApplication.setKindergartenData(kindergartenData);
		
		ChildData childData = childDataService
				.createNewChildData(compensationApplicationDTO);
		
		compensationApplication.setChildData(childData);

		compensationApplicationDAO.save(compensationApplication);
		
		childData.setCompensationApplication(compensationApplication);
		kindergartenData.setCompensationApplication(compensationApplication);
		
	}
	
	/**
	 * 
	 * Get information about submitted compensation applications for logged in user
	 * 
	 * @param currentUsername
	 * @return set of user compensation applications
	 */
	@Transactional(readOnly = true)
	public Set<CompensationApplicationInfoUser> getAllUserCompensationApplications(String currentUsername) {
		return compensationApplicationDAO.findAllUserCompensationApplications(currentUsername);
	}
	
	/**
	 * 
	 * Get information about submitted compensation application for logged in user
	 * 
	 * @param currentUsername
	 * @return set of user compensation applications
	 */
	@Transactional(readOnly = true)
	public CompensationApplicationInfo getUserCompensationApplication(String currentUsername, Long id) {
		
		CompensationApplicationInfo compensationApplicationInfo = 
				compensationApplicationDAO.findUserCompensationApplication(currentUsername, id);
		
		KindergartenDataInfo kindergartenDataInfo = 
				kindergartenDataService.getKindergartenDataByCompensationApplicationId(id);
		compensationApplicationInfo.setKindergartenDataInfo(kindergartenDataInfo);
		
		UserInfo userInfo = userService.getUserInfoByUsername(currentUsername);
		compensationApplicationInfo.setMainGuardianInfo(userInfo);
		
		ChildDataInfo childDataInfo = 
				childDataService.getChildDataInfoByCompensationApplicationId(id);
		compensationApplicationInfo.setChildDataInfo(childDataInfo);
		return compensationApplicationInfo;
	}
	
	
	
	/**
	 * Delete user compensation application by id. Also deletes ChildData
	 * and KindergartenData connected to them. Accessible to User only.
	 *
	 * @param id
	 * @return boolean indicating whether deletion was successful
	 */
	@Transactional
	public boolean deleteUserCompensationApplicationById(Long id){

		Optional<CompensationApplication> optionalCompensationApplication = 
				compensationApplicationDAO.findById(id);
		
		if (optionalCompensationApplication.isPresent()) {
			
			CompensationApplication compensationApplication = 
					optionalCompensationApplication.get();			
			
			User user = userService.findByUsername(SecurityContextHolder
					.getContext()
					.getAuthentication()
					.getName());
			
			if(compensationApplication.getMainGuardian().equals(user)) {
				
				childDataService.deleteChildData(
						compensationApplication.getChildData());
				
				kindergartenDataService.deleteKindergartenData(
						compensationApplication.getKindergartenData());
				
				compensationApplicationDAO.delete(
						compensationApplication);
				
				return true;
			}
		}
		
		return false;
	}
	
	
	
	
	/**
	 * 
	 * Check if compensation application for a child already exists
	 * 
	 * @param childPersonalCode
	 * @return true if exists
	 */
	public boolean childExistsByPersonalCode(String childPersonalCode) {
		return childDataService.childExistsByPersonalCode(childPersonalCode);
	}
	
}
