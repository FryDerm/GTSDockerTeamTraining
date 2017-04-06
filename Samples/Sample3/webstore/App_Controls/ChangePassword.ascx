<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ChangePassword.ascx.cs" Inherits="Gateway.Web.UI.Controls.ChangePassword" %>


<table id="ChangePasswordTable">
    <tr>
        <td class="OldPasswordLiteralCell">
            <asp:Literal ID="OldPasswordLiteral" Text="Old Password" runat="server" />
        </td>
        <td class="OldPasswordTextBoxCell">
            <span data-el="oldPassword"><asp:TextBox ID="OldPasswordTextBox" runat="server" TextMode="Password"/></span>
            <asp:RequiredFieldValidator ID="OldPasswordTextBoxValidator" Text="* required" runat="server"  ControlToValidate="OldPasswordTextBox" />
        
        </td>
    </tr>
    <tr>
        <td class="NewPasswordLiteralCell">
            <asp:Literal ID="NewPasswordLiteral" Text="New Password" runat="server" />
            
        </td>
        <td class="NewPasswordTextBoxCell">
            <span data-el="newPassword"><asp:TextBox ID="NewPasswordTextBox" runat="server" TextMode="Password" autocomplete="off" /></span>
            <span data-text="newPasswordValidator"><asp:RequiredFieldValidator ID="NewPasswordTextBoxValidator" Text="* required" runat="server"  ControlToValidate="NewPasswordTextBox" /></span>       
        </td>
    </tr>
    <tr>
        <td class="ConfirmPasswordLiteralCell">
            <asp:Literal ID="ConfirmPasswordLiteral" Text="Confirm Password" runat="server" />
        </td>
        <td class="ConfirmPasswordTextBoxCell">
            <span data-el="confirmPassword"><asp:TextBox ID="ConfirmPasswordTextBox" runat="server" TextMode="Password" autocomplete="off" /></span>
            <span data-text="confirmPasswordValidator"><asp:RequiredFieldValidator ID="ConfirmPasswordTextBoxValidator" Text="* required" runat="server"  ControlToValidate="ConfirmPasswordTextBox" /></span>
            <span data-el="confirmPasswordValidator"><asp:CompareValidator ID="ConfirmPasswordCompareValidator" Text=" * Password does not match" runat="server" ControlToValidate="ConfirmPasswordTextBox" ControlToCompare="NewPasswordTextBox" SetFocusOnError="true" /></span>
            
        </td>
    </tr>
    <tr>
        <td colspan="2" class="ChangePaswordButtonCell" data-el="submit">
            <asp:Button ID="ChangePasswordButton" runat="server" Text="OK" onclick="ChangePasswordButton_Click"/>
        </td>
    </tr>
    
</table>
