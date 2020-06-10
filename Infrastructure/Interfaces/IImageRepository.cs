using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IImageRepository
    {
        Task<Image> GetImageByIdAsync(int id);

        Task<IReadOnlyList<Image>> GetImagesAsync();
    }
}
