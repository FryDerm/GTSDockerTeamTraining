<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CreateAccount.ascx.cs" Inherits="Gateway.WebStore.CreateAccount" %>
<%@ Register Src="../App_Controls/AccountForm.ascx" TagName="AccountForm" TagPrefix="uc1" %>
<%@ Register Src="../App_Controls/CustContactsForm.ascx" TagName="CustContactsForm"	TagPrefix="uc2" %>
<asp:Panel ID="CreateAccountPanel" DefaultButton="ContinueButton" runat="server">
	<div id="CreateAccount">
		<uc1:AccountForm ID="AccountForm" runat="server" />
		<br />
		<uc2:CustContactsForm ID="CustContactsForm" runat="server" OnAutoPostBackFired="CustContactsForm_AutoPostBackFired" />
		<div data-el="continueButton"><asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_Click" /></div>
	</div>
</asp:Panel>