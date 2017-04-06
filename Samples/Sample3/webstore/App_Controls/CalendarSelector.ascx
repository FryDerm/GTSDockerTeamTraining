<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CalendarSelector.ascx.cs" Inherits="Gateway.Web.UI.Controls.CalendarSelector" %>
<div id="CalendarSelector">
	<table cellpadding="0" cellspacing="0" width="100%">
		<tr>
			<td width="16"><asp:ImageButton ID="PreviousMonthImageButton" runat="server" 
					AlternateText="PreviousMonth" ImageUrl="~/images/GTS/calendar_arrow_left.gif" 
					OnClick="PreviousMonthImageButton_Click" CausesValidation="false" /></td>
			<td align="center">
				<asp:DropDownList
					ID="MonthDropDownList"
					runat="server"
					AutoPostBack="true"
					OnSelectedIndexChanged="MonthDropDownList_SelectedIndexChanged">
					<asp:ListItem Value="1" />
					<asp:ListItem Value="2" />
					<asp:ListItem Value="3" />
					<asp:ListItem Value="4" />
					<asp:ListItem Value="5" />
					<asp:ListItem Value="6" />
					<asp:ListItem Value="7" />
					<asp:ListItem Value="8" />
					<asp:ListItem Value="9" />
					<asp:ListItem Value="10" />
					<asp:ListItem Value="11" />
					<asp:ListItem Value="12" />
				</asp:DropDownList>
				&nbsp;
				<asp:DropDownList
					ID="YearDropDownList"
					runat="server"
					AutoPostBack="true"
					OnSelectedIndexChanged="YearDropDownList_SelectedIndexChanged" />
			</td>
			<td class="text-right" width="16"><asp:ImageButton ID="NextMonthImageButton" runat="server" 
					AlternateText="NextMonth" ImageUrl="~/images/GTS/calendar_arrow_right.gif" 
					OnClick="NextMonthImageButton_Click" CausesValidation="false" /></td>
		</tr>
		<tr>
			<td colspan="3">
			    <asp:Calendar 
			        ID="Calendar" CellSpacing="1"
			        runat="server"
			        ShowTitle="false"
			        DayNameFormat="Shortest"
			        OnDayRender="Calendar_DayRender" 
			        OnSelectionChanged="Calendar_SelectionChanged"
					CssClass="Calendar" />
			</td>
		</tr>
	</table>
</div>