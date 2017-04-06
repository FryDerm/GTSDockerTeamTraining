<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Account.EditAccountInfo" Title="Untitled Page" Codebehind="EditAccountInfo.aspx.cs" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<%@ Register Src="../App_Controls/CustContactsForm.ascx" TagName="CustContactsForm"	TagPrefix="uc1" %>
<%@ Register Src="../App_Controls/PaymentForm.ascx" TagName="PaymentForm" TagPrefix="uc2" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" />
	<div id="EditAccountInfo">
		<uc1:CustContactsForm ID="CustContactsForm" runat="server" />
		<asp:PlaceHolder ID="PaymentInfoPlaceHolder" runat="server">
			<br />
    	    <uc2:PaymentForm ID="PaymentForm" runat="server" />
		</asp:PlaceHolder>
		<asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_Click" />
	</div>
</asp:Content>