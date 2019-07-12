using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JobSeekWeb.Models.MyClass
{
    public class Category
    {
        public int categoryId { get; set; }
        public string title { get; set; }

        public void SaveCategoryIfNotNull()
        {
            if(!String.IsNullOrEmpty(title))
            {
                using (JobEntities db = new JobEntities())
                if(db.tbl_category.Where(w => w.title == title).Count() == 0)
                {
                    tbl_category category = new tbl_category
                    {
                        title = title
                    };
                    db.tbl_category.Add(category);
                    db.SaveChanges();
                    categoryId = category.categoryId;
                }
            }
        }
        public static IEnumerable<spCategories_getAll_Result> GetCategories()
        {
            using(JobEntities db = new JobEntities())
            {
                return db.spCategories_getAll().ToList();
            }
        }
    }
}