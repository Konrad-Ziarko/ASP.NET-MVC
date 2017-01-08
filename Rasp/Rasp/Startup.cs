using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Rasp.Startup))]
namespace Rasp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
