using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JobSeekWeb.Models.MyClass
{
    public class Skills
    {
        private JobEntities db = new JobEntities();
        public int skillId { get; set; }
        public string title { get; set; }
        public int categoryId { get; set; }

        public void AddNewSkill(string title)
        {
            db.spSkill_addSkill(title, categoryId);
        }
        public void AddSkill(int workerId)
        {
            db.spWorker_addSkill(workerId, skillId);
        }
    }
}