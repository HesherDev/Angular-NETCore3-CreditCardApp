using Microsoft.EntityFrameworkCore;
using FBTarjeta.Models;

namespace FBTarjeta
{
    public class AplicationDbContext : DbContext
    {
        public DbSet<TarjetaCredito> TarjetasCredito { get; set; }
        public object TarjetaCredito { get; internal set; }

        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {
        }
    }
}
