using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PizzaShop.Api.Models
{
    public class OrderItemTopping
    {
        [Key]
        public Guid OrderItemToppingId { get; set; }

        [ForeignKey(nameof(OrderItemId))]
        public OrderItem OrderItem { get; set; }

        public Guid OrderItemId { get; set; }

        [ForeignKey(nameof(IngredientId))]
        public Ingredient Ingredient { get; set; }

        public Guid IngredientId { get; set; }

        [MaxLength(20)]
        public string Coverage { get; set; }

        [MaxLength(20)]
        public string ExtraAmount { get; set; }

        [Precision(10, 2)]
        public decimal PriceAdjustment { get; set; }
    }
}