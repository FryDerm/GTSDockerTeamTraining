<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Account.MyAccount" Title="Untitled Page" Codebehind="MyAccount.aspx.cs" %>
<%@ Register Src="../App_Controls/LinkLoyaltyAccountControl.ascx" TagName="LinkLoyaltyAccountControl" TagPrefix="uc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div id="MyAccount">
		
		<table id="AccountInformationTable" runat="server">
			<tr>
				<td class="option">
					<h2><asp:Literal ID="AccountInformationHeading" runat="server" /></h2>
					<asp:Button ID="AccountInformationButton" runat="server" OnClick="AccountInformationButton_Click" />
				</td>
				<td class="description">
					<asp:Literal ID="AccountInformationDescription" runat="server" />
				</td>
			</tr>
		</table>

		<table id="OrderHistoryTable" runat="server">
			<tr>
				<td class="option">
					<h2><asp:Literal ID="OrderHistoryHeading" runat="server" /></h2>
					<asp:Button ID="OrderHistoryButton" runat="server" OnClick="OrderHistoryButton_Click" />
				</td>
				<td class="description">
					<asp:Literal ID="OrderHistoryDescription" runat="server" />
				</td>
			</tr>
		</table>

		<table id="LoyaltyProgramsTable" runat="server">
			<tr>
				<td class="option">
					<h2><asp:Literal ID="LoyaltyProgramsHeading" runat="server" /></h2>
					<asp:Button ID="LoyaltyProgramsButton" runat="server" OnClick="LoyaltyProgramsButton_Click" />
					<asp:Button ID="LoyaltyProgramsEnrollmentButton" runat="server" OnClick="LoyaltyProgramsEnrollmentButton_Click" />
				</td>
				<td class="description">
					<asp:Literal ID="LoyaltyProgramsDescription" runat="server" />
					<asp:Literal ID="LoyaltyProgramsNotEnrolledDescription" runat="server" />
					<uc1:LinkLoyaltyAccountControl ID="LinkLoyaltyAccountControl" runat="server" OnLoyaltyAccountLinked="LinkLoyaltyAccountControl_LoyaltyAccountLinked" />
				</td>
			</tr>
		</table>

		<table id="TicketLookupTable" runat="server">
			<tr>
				<td class="option">
					<h2><asp:Literal ID="TicketLookupHeading" runat="server" /></h2>
					<asp:Button ID="TicketLookupButton" runat="server" OnClick="TicketLookupButton_Click" />
				</td>
				<td class="description">
					<asp:Literal ID="TicketLookupDescription" runat="server" />
				</td>
			</tr>
		</table>

		<table id="LogoutTable" runat="server">
			<tr>
				<td class="option">
					<h2><asp:Literal ID="LogoutHeading" runat="server" /></h2>
					<asp:Button ID="LogoutButton" runat="server" OnClick="LogoutButton_Click" />
				</td>
				<td class="description">
					<asp:Literal ID="LogoutDescription" runat="server" />
				</td>
			</tr>
		</table>
	</div>
</asp:Content>