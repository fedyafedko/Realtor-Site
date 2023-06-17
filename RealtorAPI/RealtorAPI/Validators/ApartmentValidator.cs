using FluentValidation;
using RealtorAPI.Common.DTO;

namespace RealtorAPI.Validators
{
    public class ApartmentValidator : AbstractValidator<CreateApartmentDTO>
    {
        public ApartmentValidator() 
        {
            RuleFor(a => a.Email).NotEmpty()
                .MinimumLength(1)
                .MaximumLength(50)
                .Matches()
        }
    }
}
