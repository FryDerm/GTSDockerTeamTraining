<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="TicketBookInput.ascx.cs" Inherits="Gateway.Web.UI.Controls.TicketBookInput" %>
<tr>
	<td><asp:Label runat="server" ID="TicketBookNumberLabel" /></td>
	<td>
		<asp:TextBox runat="server" MaxLength="5" ID="TicketBookNumberTextBox" />
		<asp:RequiredFieldValidator ID="TicketBookNumberRequiredFieldValidator" runat="server"
			ErrorMessage="* required"
			ControlToValidate="TicketBookNumberTextBox"
			Display="Dynamic"
			EnableClientScript="false" />
		<asp:CustomValidator ID="TicketBookCustomValidator" runat="server"
			OnServerValidate="Validate"
			ControlToValidate="TicketBookNumberTextBox"
			Display="Dynamic" />
	</td>
</tr>
<tr>
	<td><asp:Label runat="server" ID="ValidationCodeLabel" /></td>
	<td>
		<asp:TextBox runat="server" MaxLength="10" ID="ValidationCodeTextBox" />
		<asp:RequiredFieldValidator ID="ValidationCodeRequiredFieldValidator" runat="server"
			ErrorMessage="* required"
			ControlToValidate="ValidationCodeTextBox"
			Display="Dynamic"
			EnableClientScript="false" />
	</td>
</tr>