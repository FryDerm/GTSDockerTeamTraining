<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SchedulesDisplay.ascx.cs"
	Inherits="Gateway.WebStore.Transportation.SchedulesDisplay" %>
<%@ Register Src="CarriersSummary.ascx" TagName="CarriersSummary" TagPrefix="uc1" %>
<asp:Panel ID="ScheduleListPanel" runat="server">
	<asp:GridView ID="SchedulesListGridView" GridLines="None" CellSpacing="0" CellPadding="0"
		CssClass="SchedulesListView" runat="server" AutoGenerateColumns="false" OnRowDataBound="SchedulesListGridView_RowDataBound"
		OnRowCommand="SchedulesListGridView_RowCommand">
		<Columns>
			<%-- Select LinkButton --%>
			<asp:TemplateField>
				<HeaderTemplate>
					<asp:Literal ID="SchedDisplaySelectColumnliteral" runat="server" /></HeaderTemplate>
				<HeaderStyle CssClass="SelectScheduleColumnCell" />
				<ItemTemplate>
					<asp:LinkButton ID="SelectScheduleLinkButton" CommandName="SelectSchedule" runat="server" />
				</ItemTemplate>
				<ItemStyle CssClass="SelectScheduleColumnCell" />
			</asp:TemplateField>
			<%-- Departs --%>
			<asp:TemplateField>
				<HeaderTemplate>
					<asp:Literal ID="SchedDisplayDepartsColumnliteral" runat="server" />
				</HeaderTemplate>
				<HeaderStyle CssClass="DepartsColumnCell" />
				<ItemTemplate>
					<asp:Label ID="SchedulesLeavesLabel" runat="server" />
				</ItemTemplate>
				<ItemStyle CssClass="DepartsColumnCell" />
			</asp:TemplateField>
			<%-- Arrives --%>
			<asp:TemplateField>
				<HeaderTemplate>
					<asp:Literal ID="SchedDisplayArrivesColumnliteral" runat="server" /></HeaderTemplate>
				<HeaderStyle CssClass="ArrivesColumnCell" />
				<ItemTemplate>
					<asp:Label ID="SchedulesArrivesLabel" runat="server" />
				</ItemTemplate>
				<ItemStyle CssClass="ArrivesColumnCell" />
			</asp:TemplateField>
			<%-- Time --%>
			<asp:TemplateField>
				<HeaderTemplate>
					<asp:Literal ID="SchedDisplayTimeColumnLiteral" runat="server" /></HeaderTemplate>
				<HeaderStyle CssClass="TimeColumnCell" />
				<ItemTemplate>
					<asp:Label ID="SchedulesETLabel" runat="server" />
				</ItemTemplate>
				<ItemStyle CssClass="TimeColumnCell" />
			</asp:TemplateField>
			<%-- Schedule --%>
			<asp:TemplateField>
				<HeaderTemplate>
					<asp:Literal ID="SchedDisplayScheduleColumnLiteral" runat="server" />
				</HeaderTemplate>
				<HeaderStyle CssClass="SchedulesColumnCell" />
				<ItemTemplate>
					<asp:LinkButton ID="SchedulesCarrierAndSchedLinkButton" CommandName="ShowDetails"
						runat="server" />
				</ItemTemplate>
				<ItemStyle CssClass="ScheduleColumnCell" />
			</asp:TemplateField>
			<%-- Operates --%>
			<asp:TemplateField>
				<HeaderTemplate>
					<asp:Literal ID="SchedDisplayOperatesColumnLiteral" runat="server" /></HeaderTemplate>
				<HeaderStyle CssClass="OperatesColumnCell" />
				<ItemTemplate>
					<asp:Label ID="SchedulesFreqTextLabel" runat="server" />
				</ItemTemplate>
				<ItemStyle CssClass="OperatesColumnCell" />
			</asp:TemplateField>
			<%-- Connections --%>
			<asp:TemplateField>
				<HeaderTemplate>
					<asp:Literal ID="SchedDisplayConnectionsColumnLiteral" runat="server" /></HeaderTemplate>
				<HeaderStyle CssClass="ConnectionsColumnCell" />
				<ItemTemplate>
					<asp:Label ID="SchedulesConnectionsLabel" runat="server" />
				</ItemTemplate>
				<ItemStyle CssClass="ConnectionsColumnCell" />
			</asp:TemplateField>
			<%-- Adult --%>
			<asp:TemplateField>
				<HeaderTemplate>
					<asp:Literal ID="SchedDisplayAdultCustomColumnLiteral" runat="server" /></HeaderTemplate>
				<HeaderStyle CssClass="AdultColumnCell" />
				<ItemTemplate>
					<asp:Label ID="SchedulesAdultFareLabel" runat="server" />
				</ItemTemplate>
				<ItemStyle CssClass="AdultColumnCell" />
			</asp:TemplateField>
			<%-- Child --%>
			<asp:TemplateField>
				<HeaderTemplate>
					<asp:Literal ID="SchedDisplayChildColumnLiteral" runat="server" /></HeaderTemplate>
				<HeaderStyle CssClass="ChildColumnCell" />
				<ItemTemplate>
					<asp:Label ID="SchedulesChildFareLabel" runat="server" />
				</ItemTemplate>
				<ItemStyle CssClass="ChildColumnCell" />
			</asp:TemplateField>
			<%-- Student --%>
			<asp:TemplateField>
				<HeaderTemplate>
					<asp:Literal ID="SchedDisplayStudentColumnLiteral" runat="server" /></HeaderTemplate>
				<HeaderStyle CssClass="StudentColumnCell" />
				<ItemTemplate>
					<asp:Label ID="SchedulesStudentFareLabel" runat="server" />
				</ItemTemplate>
				<ItemStyle CssClass="StudentColumnCell" />
			</asp:TemplateField>
			<%-- Senior --%>
			<asp:TemplateField>
				<HeaderTemplate>
					<asp:Literal ID="SchedDisplaySeniorColumnLiteral" runat="server" /></HeaderTemplate>
				<HeaderStyle CssClass="SeniorColumnCell" />
				<ItemTemplate>
					<asp:Label ID="SchedulesSeniorFareLabel" runat="server" />
				</ItemTemplate>
				<ItemStyle CssClass="SeniorColumnCell" />
			</asp:TemplateField>
		</Columns>
		<SelectedRowStyle CssClass="SelectedRow" />
		<AlternatingRowStyle CssClass="AltRow" />
		<RowStyle CssClass="Row" />
	</asp:GridView>
</asp:Panel>
<br />
<uc1:CarriersSummary ID="SchedulesCarriersSummary" runat="server" />
