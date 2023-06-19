using FluentValidation;
using RealtorAPI.Common.DTO;

namespace RealtorAPI.Validators;

public class RegisterUserValidator : AbstractValidator<RegisterUserDTO>
{
    public RegisterUserValidator()
    {
        RuleFor(u => u.Password).NotEmpty()
            .MinimumLength(1)
            .MaximumLength(50)
            .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$");

        RuleFor(u => u.Login).NotEmpty()
            .MinimumLength(1)
            .MaximumLength(100);
        RuleFor(u => u.Email).NotEmpty()
            .MinimumLength(1)
            .MaximumLength(50)
            .Matches(@"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

        RuleFor(u => u.Phone).NotEmpty()
            .MinimumLength(1)
            .Matches(@"^\+380\d{9}$");
    }
}