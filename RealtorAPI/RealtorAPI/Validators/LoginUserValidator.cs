﻿using FluentValidation;
using RealtorAPI.Common.DTO;
using RealtorAPI.Common.DTO.Auth;

namespace RealtorAPI.Validators;

public class LoginUserValidator : AbstractValidator<LoginUserDTO>
{
    public LoginUserValidator()
    {
        RuleFor(u => u.Password).NotEmpty()
            .MinimumLength(1)
            .MaximumLength(50)
            .Matches( @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$");
        
        RuleFor(u => u.Login).NotEmpty()
            .MinimumLength(1)
            .MaximumLength(100);
    }
}