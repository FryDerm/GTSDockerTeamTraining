<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ForgotPassword.ascx.cs" Inherits="Gateway.Web.UI.Controls.ForgotPassword" %>
<table>
<tr>
    <td colspan="3">
        <asp:Literal ID="DescriptionLiteral" runat="server" />
    </td>

</tr>
<tr>
    <td>
        <asp:Literal ID="UsernameLiteral" runat="server" Text="UserName" />
    </td>
    <td>
        <asp:TextBox ID="UsernameTextBox" runat="server" />
    </td>
    <td>
        <asp:Button ID="UsernameButton" runat="server" Text="OK" OnClick="UsernameButton_Click" />
    </td>

</tr>

<tr>
    <td >
        <asp:Literal ID="SecurityQuestionLiteral" runat="server" Text="Security Question" />
    </td>
    <td colspan="2">
        <asp:DropDownList ID="SecurityQuestionDropDownList" runat="server" />
    
    </td>

</tr>
<tr>
    <td>
        <asp:Literal ID="AnswerLiteral" runat="server" Text="Answer" />       
    </td>
    
    <td colspan="2">
        <asp:TextBox ID="AnswerTextBox" runat="server" EnableViewState="false" />
        
        <asp:RequiredFieldValidator ID="AnswerValidator" runat="server" ErrorMessage="* required" ControlToValidate="AnswerTextBox" />
    </td>
</tr>
<tr>
    <td>
        <asp:Button ID="AnswerButton" runat="server" Text="OK" OnClick="AnswerButton_Click" />
    </td>
    <td colspan="2">
        <asp:Button ID="SaveButton" runat="server" Text="Save" OnClick="SaveButton_Click" />
    </td>

</tr>

</table>