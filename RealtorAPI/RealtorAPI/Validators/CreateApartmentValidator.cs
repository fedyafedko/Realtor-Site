using FluentValidation;
using RealtorAPI.Common.DTO;

namespace RealtorAPI.Validators
{
    public class CreateApartmentValidator : AbstractValidator<CreateApartmentDTO>
    {
        public CreateApartmentValidator() 
        {
            RuleFor(a => a.Email).NotEmpty()
                .MinimumLength(1)
                .MaximumLength(50)
                .Matches(@"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

            RuleFor(a => a.Phone).NotEmpty()
                .MinimumLength(1)
                .Matches(@"^\+380\d{9}$");

            RuleFor(d => d.NumberRoom).GreaterThan(0);

            RuleFor(d => d.Square).GreaterThan(0);

            RuleFor(d => d.Floor).GreaterThan(0);

            RuleFor(d => d.Description).NotEmpty()
                .MinimumLength(1)
                .MaximumLength(100);
        }
    }
}
