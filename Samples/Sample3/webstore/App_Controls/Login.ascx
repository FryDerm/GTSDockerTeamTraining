<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Login.ascx.cs" Inherits="Gateway.Web.UI.Controls.Login" %>
<asp:Panel ID="LoginPanel" DefaultButton="LoginButton" runat="server">
	<div id="Login" class="float-left width-45 padding-10px" data-replace="Login">
	    <div class="username-form-field form-field">
			<div class="form-field-label" data-text="UsernameLabel"><label for="UsernameTextBox"><asp:Literal ID="UsernameLiteral" Text="Username" runat="server" /></label></div>
			<div class="form-field-input" data-el="UsernameTextbox"><asp:TextBox ID="UsernameTextBox" runat="server" /></div>
            <span class="form-field-validation"data-text="UsernameValidator"><asp:RequiredFieldValidator ID="UserNameRequiredFieldValidator" ControlToValidate="UsernameTextBox" Text = "* required" Enabled="false" runat="server" /></span>
			<div class="clear"></div>
		</div>

	    <div class="password-form-field form-field">
			<div class="form-field-label" data-text="PasswordLabel"><label for="PasswordTextBox"><asp:Literal ID="PasswordLabel" Text="Password" runat="server" /></label></div>
			<div class="form-field-input" data-el="PasswordTextbox"><asp:TextBox ID="PasswordTextBox" runat="server" TextMode="Password" ValidateRequestMode="Disabled" /></div>
            <span class="form-field-validation" data-text="PasswordValidator"><asp:RequiredFieldValidator ID="PasswordRequiredFieldValidator" ControlToValidate="PasswordTextBox" Text = "* required" Enabled="false" runat="server" /></span>
			<div class="clear"></div>
		</div>

        <div id="CompanyCodeTableRow" class="company-code-form-field form-field" runat="server" visible="false">
			<div class="form-field-label"><label for="CompanyCodeTextBox"><asp:Literal ID="CompanyCodeLiteral" runat="server" /></label></div>
			<div class="form-field-input" data-el="companyCodeTextbox"><asp:TextBox ID="CompanyCodeTextBox" runat="server" /></div>
            <div class="form-field-validation"></div>
			<div class="clear"></div>
		</div>
        
		<p class="forgot-password" id="ForgotPasswordTableRow" runat="server" visible="false">
			<asp:HyperLink ID="ForgotPasswordHyperLink" Text="Forgot Password" runat="server" />
		</p>

        <span data-el="LoginButton"><asp:Button ID="LoginButton" Text="Login" OnClick="LoginButton_Click" runat="server" CssClass="large-button" /></span>
	</div>
    
    <div data-replace="LoginCompanyCodeOnly">
        <div id="LoginCompanyCodeOnly" class="float-left width-45 padding-10px border-left-gray" runat="server" Visible="False" >
	        <div id="Div1" class="company-code-form-field form-field" runat="server">
			    <div class="form-field-label" data-text="CompanyCodeOnlyLabel"><label for="CompanyCodeOnlyTextbox"><asp:Literal ID="CompanyCodeOnlyLiteral" runat="server" /></label></div>
			    <div class="form-field-input" data-el="CompanyCodeOnlyTextbox"><asp:TextBox ID="CompanyCodeOnlyTextbox" runat="server" /></div>
                <div class="form-field-validation" data-text="CompanyCodeOnlyValidator"></div>
			    <div class="clear"></div>
		    </div>
        
            <span data-el="ContinueAsGuestButton">
                <asp:Button ID="ContinueAsGuestButton" Text="Continue" OnClick="ContinueAsGuestButton_Click" runat="server" CssClass="large-button" />
            </span>
	    </div>
    </div>
    <div class="clear"></div>
</asp:Panel>