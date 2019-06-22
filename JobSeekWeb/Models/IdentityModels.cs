using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace JobSeekWeb.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit https://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class JobUser : IdentityUser<int, JobLogin, JobUserRole, JobClaim>
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<JobUser, int> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }
    public class JobLogin : IdentityUserLogin<int> { }
    public class JobUserRole : IdentityUserRole<int> { }
    public class JobClaim : IdentityUserClaim<int> { }
    public class JobRole : IdentityRole<int, JobUserRole> { }
    public class JobUserStore : UserStore<JobUser, JobRole, int,
    JobLogin, JobUserRole, JobClaim>
    {
        public JobUserStore(ApplicationDbContext context)
            : base(context)
        {
        }
    }
    public class JobRoleStore : RoleStore<JobRole, int, JobUserRole>
    {
        public JobRoleStore(ApplicationDbContext context)
            : base(context)
        {
        }
    }

    public class ApplicationDbContext : IdentityDbContext<JobUser, JobRole,
    int, JobLogin, JobUserRole, JobClaim>
    {
        public ApplicationDbContext()
            : base("DefaultConnection")
        {  }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<JobUser>()
                .ToTable("tbl_asp_users", "dbo");
            modelBuilder.Entity<JobRole>()
                .ToTable("tbl_asp_role", "dbo");
            modelBuilder.Entity<JobClaim>()
                .ToTable("tbl_asp_user_claim", "dbo");
            modelBuilder.Entity<JobUserRole>()
                .ToTable("tbl_asp_user_role", "dbo");
            modelBuilder.Entity<JobLogin>()
                .ToTable("tbl_asp_user_login", "dbo");

        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}