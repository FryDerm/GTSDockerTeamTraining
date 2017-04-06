<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CreateContact.ascx.cs" Inherits="Gateway.WebStore.CreateContact" %>
<%@ Register Src="../App_Controls/CustContactsForm.ascx" TagName="CustContactsForm"	TagPrefix="uc1" %>
<asp:Panel ID="CreateContactPanel" DefaultButton="ContinueButton" runat="server">
	<div id="CreateContact">
		<uc1:CustContactsForm ID="CustContactsForm" runat="server" OnAutoPostBackFired="CustContactsForm_AutoPostBackFired" />
		<asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_Click" />
	</div>
</asp:Panel>