using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(JobSeekWeb.Startup))]
namespace JobSeekWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
