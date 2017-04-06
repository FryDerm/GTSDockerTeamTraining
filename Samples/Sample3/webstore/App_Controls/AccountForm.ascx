<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="AccountForm.ascx.cs" Inherits="Gateway.WebStore.AccountForm" %>
<%@ Register Src="../App_Controls/PaymentForm.ascx" TagName="PaymentForm" TagPrefix="uc1" %>
<div id="AccountForm">
    <table>
		<tr id="CompanyCodeTableRow" runat="server" visible="false">
			<td><asp:Label ID="CompanyCodeLabel" runat="server" Text="CompanyCode" /></td>
			<td>
				<div data-el="companyCode"><asp:TextBox ID="CompanyCodeTextBox" runat="server" /></div>
				<asp:RequiredFieldValidator ID="CompanyCodeFieldValidator" runat="server" ControlToValidate="CompanyCodeTextBox" Enabled="false" Display="Dynamic" />
			</td>
		</tr>
        <tr>
            <td id="AccountUsernameColumn"><asp:Label ID="UsernameLabel" runat="server" /></td>
            <td>
                <div data-el="username"><asp:TextBox ID="UsernameTextBox" runat="server" CausesValidation="true" /></div>
			    <asp:RequiredFieldValidator ID="UsernameFieldValidator" runat="server" ControlToValidate="UsernameTextBox" Display="Dynamic" />
				<span data-text="usernameFieldValidator"><asp:RegularExpressionValidator ID="UsernameEmailFormatValidator" runat="server" ControlToValidate="UsernameTextBox" 
					ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" Display="Dynamic" Enabled="false" /></span>
            </td>
        </tr>

        <tr>
            <td><asp:Label ID="PasswordLabel" runat="server" /></td>
            <td>
                <div data-el="password"><asp:TextBox ID="PasswordTextBox" runat="server" TextMode="Password" CausesValidation="true" /></div>
			    <asp:RequiredFieldValidator ID="PasswordFieldValidator" runat="server" ControlToValidate="PasswordTextBox" Display="Dynamic" />                    
            </td>
        </tr>

        <tr>
            <td><asp:Label ID="ConfirmPasswordLabel" runat="server" /></td>
            <td>
               <div data-el="confirmPassword"> <asp:TextBox ID="ConfirmPasswordTextBox" runat="server" TextMode="Password" CausesValidation="true" /></div>
			    <asp:RequiredFieldValidator ID="ConfirmPasswordRequiredFieldValidator" runat="server" ControlToValidate="ConfirmPasswordTextBox" Display="Dynamic" />
			    <asp:CompareValidator ID="ConfirmPasswordMatchRequiredFieldValidator" runat="server" ControlToCompare="PasswordTextBox" ControlToValidate="ConfirmPasswordTextBox" Display="Dynamic" />
            </td>
        </tr>
        
    </table>
    
    <uc1:PaymentForm ID="PaymentForm" runat="server" />
    
</div>