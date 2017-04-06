<%@ Page Title="Untitled Page" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="LoyaltyEnrollment.aspx.cs" Inherits="Gateway.WebStore.LoyaltyPrograms.LoyaltyEnrollment" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register Src="../App_Controls/PassLookupControl.ascx" TagName="PassLookup" TagPrefix="uc1" %>
<%@ Register Src="../App_Controls/Login.ascx" TagName="Login" TagPrefix="uc2" %>
<%@ Register Src="../App_Controls/CreateAccount.ascx" TagName="CreateAccount" TagPrefix="uc3" %>
<%@ Register Src="../App_Controls/CreateContact.ascx" TagName="CreateContact" TagPrefix="uc4" %>
<%@ Register Src="../App_Controls/UpdateProgressControl.ascx" TagName="UpdateProgressControl" TagPrefix="uc5" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" runat="server" data-replace="LoyaltyEnroll">
	<div id="LoyaltyProgramEnrollment" data-replace="LoyaltyEnroll">
		<div id="LoyaltyBlurb">
			<p><asp:Literal ID="LoyaltyBlurbLiteral" runat="server" /></p>
		</div>
		<asp:ScriptManager ID="ScriptManager1" runat="server" />
		<asp:UpdatePanel ID="UpdatePanel" runat="server">
			<ContentTemplate>
				<table>
					<tr>
						<td id="ExistingPassHolderCell" runat="server">
							<div class="block">
								<h1><asp:Literal ID="ExistingPassholderHeadingLiteral" runat="server" /></h1>
								<p><asp:Literal ID="ExistingPassholderDescriptionLiteral" runat="server" /></p>
								<span data-el="existingPassButton"><asp:Button ID="ExistingPassholderButton" runat="server" CausesValidation="false" OnClick="ExistingPassholderButton_Click" /></span>
							</div>
						</td>
						<td id="ExistingAccountCell" runat="server">
							<div class="block">
								<h1><asp:Literal ID="ExistingAccountHeadingLiteral" runat="server" /></h1>
								<p><asp:Literal ID="ExistingAccountDescriptionLiteral" runat="server" /></p>
								<span data-el="existingAccountButton"><asp:Button ID="ExistingAccountButton" runat="server" CausesValidation="false" OnClick="ExistingAccountButton_Click" /></span>
							</div>
						</td>
						<td id="NewAccountCell" runat="server">
							<div class="block">
								<h1><asp:Literal ID="NewAccountHeadingLiteral" runat="server" /></h1>
								<p><asp:Literal ID="NewAccountDescriptionLiteral" runat="server" /></p>
								<span data-el="newAccountButton"><asp:Button ID="NewAccountButton" runat="server" CausesValidation="false" OnClick="NewAccountButton_Click" /></span>
							</div>
						</td>
						<td id="NewContactCell" runat="server">
							<div class="block">
								<h1><asp:Literal ID="NewContactHeadingLiteral" runat="server" /></h1>
								<p><asp:Literal ID="NewContactDescriptionLiteral" runat="server" /></p>
								<span data-el="newContactButton"><asp:Button ID="NewContactButton" runat="server" CausesValidation="false" OnClick="NewContactButton_Click" /></span>
							</div>
						</td>
					</tr>
				</table>

				<asp:Button ID="HiddenButton" runat="server" style="display:none;" />
				<cc1:ModalPopupExtender ID="LoyaltyProgramEnrollment_ModalPopupExtender" runat="server"
					TargetControlID="HiddenButton"
					PopupControlID="LoyaltyProgramEnrollmentPanel"
					CancelControlID="CancelButton"
					BackgroundCssClass="modalBackground" /> 
	
				<asp:Panel ID="LoyaltyProgramEnrollmentPanel" CssClass="modalPopup" runat="server">
					<div id="LoyaltyProgramEnrollmentContent">
						<div data-text="error"><asp:Label ID="ErrorMessageLabel" CssClass="message errorMessage" runat="server" Visible="false" EnableViewState="false" /></div>
						<table>
							<tr>
								<td>
									<asp:Panel ID="ExistingPassHolderPanel" runat="server" Visible="false">
									    <div data-isPassLookup="true"></div>
										<h1><asp:Literal ID="PassLookupPromptHeadingLiteral" runat="server" /></h1>
										<uc1:PassLookup
											ID="PassLookupControl"
											runat="server"
											OnPassLookupSucceeded="PassLookupControl_PassLookupSucceeded"
											OnPassLookupFailed="PassLookupControl_PassLookupFailed" />
									</asp:Panel>
									<asp:Panel ID="ExistingAccountPanel" runat="server" Visible="false">
									    <div data-isExistingAccount="true"></div>
										<h1><asp:Literal ID="ExistingAccountPromptHeadingLiteral" runat="server" /></h1>
										<uc2:Login
											ID="LoginControl"
											runat="server"
											AuthenticateType="eGalaxy"
											OnAuthenticated="LoginControl_Authenticated"
											OnAuthenticationFailed="LoginControl_AuthenticationFailed" />
									</asp:Panel>
									<asp:Panel ID="NewAccountPanel" runat="server" Visible="false">
									    <div data-isNewAccount="true"></div>
										<h1><asp:Literal ID="NewAccountPromptHeadingLiteral" runat="server" /></h1>
										<uc3:CreateAccount
											ID="CreateAccountControl"
											runat="server"
											OnAccountCreated="CreateAccountControl_AccountCreated"
											OnAccountCreationFailed="CreateAccountControl_AccountCreationFailed"
											OnAutoPostBackFired="CreateAccountControl_AutoPostBackFired" />
									</asp:Panel>
									<asp:Panel ID="NewContactPanel" runat="server" Visible="false">
									    <div data-isNewContact="true"></div>
										<h1><asp:Literal ID="NewContactPromptHeadingLiteral" runat="server" /></h1>
										<uc4:CreateContact
											ID="CreateContactControl"
											runat="server"
											OnContactCreated="CreateContactControl_ContactCreated"
											OnContactCreationFailed="CreateContactControl_ContactCreationFailed"
											OnAutoPostBackFired="CreateContactControl_AutoPostBackFired" />
									</asp:Panel>
								</td>

							</tr>
							<tr>
								<td>
									<asp:Button ID="CancelButton" runat="server" CausesValidation="false" CssClass="cancelButton" />	
								</td>
							</tr>
						</table>
					</div>
				</asp:Panel>
			</ContentTemplate>
		</asp:UpdatePanel>
		<uc5:UpdateProgressControl ID="UpdateProgressControl" runat="server" />
	</div>
    
   <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/loyaltyEnroll.html") %>
</asp:Content>