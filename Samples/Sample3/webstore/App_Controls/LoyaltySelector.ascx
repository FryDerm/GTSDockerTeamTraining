<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LoyaltyProgramSelector.ascx.cs" Inherits="Gateway.WebStore.LoyaltyProgramSelector" %>
<div id="LoyaltyPrograms" data-replace="LoyaltySelector">
	<asp:GridView ID="LoyaltyProgramGridView" runat="server" 
		AutoGenerateColumns="false"
		OnRowDatabound="LoyaltyProgramGridView_RowDataBound"
		GridLines="None"
		ShowHeader="false"
		ShowFooter="true">
		<EmptyDataTemplate>
			<asp:Label id="NoLoyaltyProgramsAvailableLabel" runat="server" />
		</EmptyDataTemplate>
		<Columns>
			<asp:TemplateField>
				<ItemTemplate>
					<div data-object-key="account" class="block">
						<span data-el="input"><asp:Literal ID="RadioButtonLiteral" runat="server" /></span><h1 data-text="name"><asp:Literal ID="NameLiteral" runat="server" /></h1>
						<p data-text="desc"><asp:Literal ID="DescriptionLiteral" runat="server" /></p>
					</div>
				</ItemTemplate>
				<FooterTemplate>
					<div data-el="submitButton"><asp:Button ID="EnrollButton" runat="server" OnClick="EnrollButton_Click" /></div>
					<asp:Button id="CancelButton" runat="server" OnClick="CancelButton_Click" />					
				</FooterTemplate>
			</asp:TemplateField>
		</Columns>
	</asp:GridView>
</div>