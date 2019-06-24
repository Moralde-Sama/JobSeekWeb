﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace JobSeekWeb.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class JobEntities : DbContext
    {
        public JobEntities()
            : base("name=JobEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<C__MigrationHistory> C__MigrationHistory { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<tbl_asp_role> tbl_asp_role { get; set; }
        public virtual DbSet<tbl_asp_user_claim> tbl_asp_user_claim { get; set; }
        public virtual DbSet<tbl_asp_user_login> tbl_asp_user_login { get; set; }
        public virtual DbSet<tbl_asp_users> tbl_asp_users { get; set; }
        public virtual DbSet<tbl_chat> tbl_chat { get; set; }
        public virtual DbSet<tbl_chat_attachment> tbl_chat_attachment { get; set; }
        public virtual DbSet<tbl_company_job> tbl_company_job { get; set; }
        public virtual DbSet<tbl_notification> tbl_notification { get; set; }
        public virtual DbSet<tbl_project> tbl_project { get; set; }
        public virtual DbSet<tbl_project_participants> tbl_project_participants { get; set; }
        public virtual DbSet<tbl_requirements> tbl_requirements { get; set; }
        public virtual DbSet<tbl_skill> tbl_skill { get; set; }
        public virtual DbSet<tbl_worker_skill> tbl_worker_skill { get; set; }
        public virtual DbSet<tbl_company> tbl_company { get; set; }
        public virtual DbSet<tbl_worker> tbl_worker { get; set; }
        public virtual DbSet<tbl_category> tbl_category { get; set; }
    
        public virtual ObjectResult<Nullable<int>> spWorker_Exist(Nullable<int> asp_userId)
        {
            var asp_userIdParameter = asp_userId.HasValue ?
                new ObjectParameter("asp_userId", asp_userId) :
                new ObjectParameter("asp_userId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<int>>("spWorker_Exist", asp_userIdParameter);
        }
    
        public virtual ObjectResult<spWorker_getDetails_Result> spWorker_getDetails(Nullable<int> asp_userId)
        {
            var asp_userIdParameter = asp_userId.HasValue ?
                new ObjectParameter("asp_userId", asp_userId) :
                new ObjectParameter("asp_userId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spWorker_getDetails_Result>("spWorker_getDetails", asp_userIdParameter);
        }
    }
}
