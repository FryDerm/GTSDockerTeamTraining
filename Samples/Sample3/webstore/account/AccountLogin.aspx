<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Account.AccountLogin" Title="Untitled Page" Codebehind="AccountLogin.aspx.cs" %>
<%@ Register Src="../App_Controls/Login.ascx" TagName="Login" TagPrefix="uc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
    <meta http-equiv="refresh" content="0;URL='../AccountProfile/Logon'" />
</asp:Content>

<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div id="AccountLogin">
		<table width="100%">
			<tr>
				<td>
					<h4><asp:Literal ID="ExistingCustomerHeadingLiteral" runat="server" /></h4>
				</td>
				<td>
					<h4>
					    <asp:Literal ID="ContinueHeadingLiteral" runat="server" />
					    <asp:Literal ID="CreateAccountHeadingLiteral" runat="server" />
					    <asp:Literal ID="CheckoutCreateAccountHeadingLiteral" runat="server" />
					</h4>
				</td>
			</tr>
			<tr>
				<td>
					<p><asp:Literal ID="ExistingCustomerDescriptionLiteral" runat="server" /></p>
					
					    <uc1:Login ID="LoginControl"
					        runat="server"
							AuthenticateType="eGalaxy"
							ForgotPasswordNavigateUrl="~/account/PasswordRequest.aspx"
							OnAuthenticated="LoginControl_Authenticated"
							OnAuthenticationFailed="LoginControl_AuthenticationFailed" />
				</td>
				<td>
					<asp:PlaceHolder ID="ContinuePlaceHolder" runat="server">
    					<p><asp:Literal ID="ContinueDescriptionLiteral" runat="server" /></p>
    					<asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_OnClick" />
					</asp:PlaceHolder>
					
					<asp:PlaceHolder ID="CreateAccountPlaceHolder" runat="server" Visible="false">
					    <p><asp:Literal ID="CreateAccountDescriptionLiteral" runat="server" /></p>
					    <asp:Button ID="CreateAccountButton" runat="server" OnClick="CreateAccountButton_OnClick" />
					</asp:PlaceHolder>
					
					<asp:PlaceHolder ID="RevalueCreateAccountPlaceHolder" runat="server" Visible="false">
					    <p><asp:Literal ID="CheckoutCreateAccountDescriptionLiteral" runat="server" /></p>
					    <asp:Button ID="CheckoutCreateAccountButton" runat="server" OnClick="CheckoutCreateAccountButton_OnClick" />
				    </asp:PlaceHolder>
				</td>
			</tr>
		</table>
	</div>
</asp:Content>