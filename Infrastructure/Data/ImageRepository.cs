using Core.Entities;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ImageRepository : IImageRepository
    {
        private readonly StoreContext _context;

        public ImageRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<Image> GetImageByIdAsync(int id)
        {
            return await _context.Images.FindAsync(id);
        }

        public async Task<IReadOnlyList<Image>> GetImagesAsync()
        {
            return await _context.Images.ToListAsync();
        }
    }
}
