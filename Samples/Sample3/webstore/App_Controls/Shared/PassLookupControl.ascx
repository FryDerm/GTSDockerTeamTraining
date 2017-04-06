<%@ Control Language="C#" AutoEventWireup="true" Inherits="Gateway.Web.UI.Controls.PassLookupControl" Codebehind="PassLookupControl.ascx.cs" %>
<%@ Register Src="DateInput.ascx" TagName="DateInput" TagPrefix="uc1" %>

<%@ Register src="DateDropdownList.ascx" tagname="DateDropdown" tagprefix="uc2" %>

<asp:Panel id="PassLookupPanel" DefaultButton="LookupButton" runat="server">
	<div id="PassLookup">
		<asp:Panel ID="VisualIDPanel" runat="server">
			<span data-text="visualIdLabel"><asp:Label ID="VisualIDLabel" runat="server" AssociatedControlID="VisualIDTextBox" /></span><br />
			<span data-el="visualIdInput"><asp:TextBox ID="VisualIDTextBox" runat="Server" /></span>
			<asp:RequiredFieldValidator ID="VisualIDRequiredValidator" runat="server" ControlToValidate="VisualIDTextBox" />
		</asp:Panel>
		<asp:Panel ID="AccountNumberPanel" runat="server">
			<span data-text="accountNumberLabel"><asp:Label ID="AccountNumberLabel" runat="server" AssociatedControlID="AccountNumberTextBox" /></span><br />
			<span data-el="accountNumberInput"><asp:TextBox ID="AccountNumberTextBox" runat="Server" /></span>
			<asp:RequiredFieldValidator ID="AccountNumberRequiredValidator" runat="server" ControlToValidate="AccountNumberTextBox" />
		</asp:Panel>
		<asp:Panel ID="LastNamePanel" runat="server">
			<span data-text="lastNameLabel"><asp:Label ID="LastNameLabel" runat="server" AssociatedControlID="LastNameTextBox" /></span><br />
			<span data-el="lastNameInput"><asp:TextBox ID="LastNameTextBox" runat="server" /></span>
			<asp:RequiredFieldValidator ID="LastNameRequiredValidator" runat="server" ControlToValidate="LastNameTextBox" Enabled="false" />		        
		</asp:Panel>
		<asp:Panel ID="BirthDatePanel" runat="server">
			<span data-text="birthDateLabel"><asp:Label ID="BirthDateLabel" runat="server" AssociatedControlID="birthDateTextBox" /></span><br />
			<span data-el="birthDateInput"><asp:TextBox ID="birthDateTextBox" runat="server" /></span>
			<%--<uc1:DateInput ID="BirthDateSelector" runat="server" />
		    <uc2:DateDropdown ID="BirthDateDropdownSelector" runat="server" />--%>
		   
		</asp:Panel>
		<br />
		<span data-el="submitButton"><asp:Button ID="LookupButton" runat="server" OnClick="LookupButton_Click" /></span>
	</div>
</asp:Panel>