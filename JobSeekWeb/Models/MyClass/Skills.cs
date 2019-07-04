using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JobSeekWeb.Models.MyClass
{
    public class Skills
    {
        public JobEntities db = new JobEntities();
        public int skillId { get; set; }
        public string title { get; set; }
        public int categoryId { get; set; }
        public string[] newSkills { get; set; }
        public int[] addSkills { get; set; }
        public int[] removeSkill { get; set; }

        public void AddNewSkill()
        {
            db.spSkill_addSkill(title, categoryId);
        }

        public int[] AddMultipleNewSkillProj()
        {
            if (newSkills?.Length > 0)
            {
                int[] newSkillId = new int[newSkills.Length];
                for(int i = 0; i < newSkills.Length; i++)
                {
                    db.spSkill_addSkill(newSkills[i], 0);
                    var skillDetails = db.spSkill_getSkillDetailsByTitle(newSkills[i]).FirstOrDefault();
                    newSkillId[i] = skillDetails.skillId;
                }
                return newSkillId;
            }
            else
            {
                return null;
            }
            
        }

        public void AddSkill(int workerId)
        {
            db.spWorker_addSkill(workerId, skillId);
        }

        public void AddMultipleSkills(int workerId)
        {
            if (addSkills?.Length > 0)
            {
                foreach (int skillId in addSkills)
                {
                    db.spWorker_addSkill(workerId, skillId);
                }
            }
        }

        public void AddMultipleSkillsProj(int projId)
        {
            if (addSkills?.Length > 0)
            {
                foreach (int skillId in addSkills)
                {
                    tbl_pproject_skill pskill = new tbl_pproject_skill
                    {
                        perprojectId = projId,
                        skillId = skillId
                    };
                    db.tbl_pproject_skill.Add(pskill);
                    db.SaveChanges();
                }
            }
        }

        public void RemoveSkills()
        {
            if(removeSkill?.Length > 0)
            {
                foreach(int workerSkillId in removeSkill)
                {
                    db.spWorker_deleteSkill(workerSkillId);
                }
            }
        }
        public static spSkill_getSkillDetailsByTitle_Result getSkillDetailsByTitle(string title)
        {
            return new JobEntities().spSkill_getSkillDetailsByTitle(title).FirstOrDefault();
        }
    }
}