<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Account.PasswordRequest" Title="Untitled Page" Codebehind="PasswordRequest.aspx.cs" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div id="PasswordRequest">
		<table>
			<tr>
				<td colspan="2">
					<asp:Literal ID="InfoLiteral" runat="server" />
				</td>
			</tr>
			<tr>
				<td>
					<asp:Label ID="UsernameLabel" AssociatedControlID="UsernameTextBox" runat="server" />
				</td>
				<td>
					<asp:TextBox ID="UsernameTextBox" runat="server" />
				</td>
			</tr>
			<tr>
				<td>
					<asp:Label ID="EmailLabel" AssociatedControlID="EmailTextBox" runat="server" />
				</td>
				<td>
					<asp:TextBox ID="EmailTextBox" runat="server" />
				</td>
			</tr>
			<tr>
				<td></td>
				<td>
					<asp:LinkButton ID="PasswordRequestLinkButton" runat="server" OnClick="PasswordRequestLinkButton_OnClick" target="" />
				</td>
			</tr>
		</table>
	</div>
</asp:Content>