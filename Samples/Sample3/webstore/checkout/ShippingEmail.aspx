<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="ShippingEmail.aspx.cs" Inherits="Gateway.WebStore.checkout.ShippingEmail" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
	<div id="ShippingEmail">
	<br />
	<table>
		<tr>
			<td colspan="2">
				Your PrintAtHome tickets will be emailed to this address.<br /><br />
				<em><span style="color:#ff0000;">*</span>Indicates required field</em><br /><br />
			</td>
		</tr>
		<tr>
			<td><span style="width:100px;">&nbsp;</span></td>
			<td>
				<span style="color:#ff0000;">*</span><b>Email Address:&nbsp;</b><asp:TextBox ID="EmailTextBox" runat="server" Enabled="false" Columns="50" /><br />
			</td>
		</tr>
		<tr>
			<td colspan="2" align="center">
				<asp:Button ID="ContinueButton" Text="Continue" runat="server" OnClick="ContinueButton_Click" />
			</td>
		</tr>
	</table>
</div>
</asp:Content>