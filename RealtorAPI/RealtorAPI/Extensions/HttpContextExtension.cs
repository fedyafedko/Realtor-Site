namespace RealtorAPI.Extensions;

public static class HttpContextExtension
{
    public static int GetUserId(this HttpContext context)
    {
        var claim = context.User.Claims.FirstOrDefault(c => c.Type == "id");
        if (claim == null)
            throw new Exception("Unauthorized");
        return Convert.ToInt32(claim.Value);

    }
}