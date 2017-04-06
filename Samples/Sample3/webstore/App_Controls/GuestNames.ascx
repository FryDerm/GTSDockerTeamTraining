<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="GuestNames.ascx.cs" Inherits="Gateway.Web.UI.Controls.GuestNames" %>

	<%@ Register src="CustContactsForm.ascx" tagname="CustContactsForm" tagprefix="uc1" %>
    <asp:ScriptManager ID="ScriptManager1" runat="server" />

	<asp:Literal ID="GuestNamesDescriptionLiteral" runat="server" />

	<div id="GuestNameTableWrapper">
		<asp:GridView ID="GuestNameGridView" runat="server"  CssClass="GuestNameTable" GridLines="None" AutoGenerateColumns="false" DataKeyNames="OrderLineID" OnRowDataBound="GuestNameDataGrid_RowDataBound">
		<Columns>
			<asp:TemplateField  HeaderStyle-CssClass="GuestTicketHeaderColumn" ItemStyle-CssClass="GuestTicketDescriptionColumn">
				<HeaderTemplate>
					<asp:Label ID="GuestTicketHeadingLabel" runat="server" />
				</HeaderTemplate>
				<ItemTemplate>
					<asp:Label ID="GuestTicketDescriptionLabel" runat="server" />
				</ItemTemplate>
			</asp:TemplateField>
            <asp:TemplateField ItemStyle-CssClass="GuestFirstNameColumn">

                <ItemTemplate>
                    <div class="guest-firstname wrap">
                        <div class="label">
                            <asp:Label ID="GuestFirstNameLabel" runat="server" /></div>
                        <div class="field">
                            <asp:TextBox ID="FirstNameTextBox" runat="server" /><br />
                            <asp:RequiredFieldValidator ID="FirstNameReqValidator" runat="server" ControlToValidate="FirstNameTextBox" Display="Dynamic" />
                        </div>
                    </div>
                    <div class="guest-lastname wrap">
                        <div class="label">
                            <asp:Label ID="GuestLastNameLabel" runat="server" /></div>
                        <div class="field">
                            <asp:TextBox ID="LastNameTextBox" runat="server" /><br />
                            <asp:RequiredFieldValidator ID="LastNameReqValidator" runat="server" ControlToValidate="LastNameTextBox" Display="Dynamic" />
                        </div>
                    </div>
                </ItemTemplate>
            </asp:TemplateField>
			
            <asp:TemplateField ItemStyle-CssClass="GuestContactColumn">
				
				<ItemTemplate>
					 <uc1:CustContactsForm ID="CustContactsFormControl" runat="server" />
				</ItemTemplate>
			</asp:TemplateField>
		</Columns>
            <RowStyle CssClass="GuestNameRow" />
            <AlternatingRowStyle CssClass="GuestNameAltRow" />
	</asp:GridView>
	   
	</div>
	<asp:Button id="SubmitButton" OnClick="SubmitButton_Click" runat="server" />
