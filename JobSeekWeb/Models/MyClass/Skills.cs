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
        public string[] newSkill { get; set; }
        public int[] addSkills { get; set; }
        public int[] removeSkill { get; set; }

        public void AddNewSkill(string title)
        {
            db.spSkill_addSkill(title, categoryId);
        }
        public void AddSkill(int workerId)
        {
            if(addSkills?.Length > 0)
            {
                foreach(int skillId in addSkills)
                {
                    db.spWorker_addSkill(workerId, skillId);
                }
            }
            else
            {
                if(skillId != 0)
                {
                    db.spWorker_addSkill(workerId, skillId);
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