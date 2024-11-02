using System.ComponentModel.DataAnnotations;

namespace FBTarjeta.Models
{
    public class TarjetaCredito
    {
        public int Id { get; set; }

        [Required]
        public string titular { get; set; }

        [Required]
        public string numeroTarjeta { get; set; }

        [Required]  
        public string fechaExpiracion { get; set; }

        [Required]
        public string cvv { get; set; }
    }
}
