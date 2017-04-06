<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Account.TicketReplenishment" Title="Untitled Page" Codebehind="TicketReplenishment.aspx.cs" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div id="TicketReplenishment">
		<p><asp:Literal ID="HeaderLiteral" runat="server" /></p>
		<p><asp:Literal ID="InfoLiteral" runat="server" /></p>
		<!-- ---------- [ticket list] ---------- -->
		<asp:Repeater ID="TicketList" runat="server" Visible="false" 
            OnItemDataBound="TicketList_ItemDataBound" >
            <HeaderTemplate>
				<table width="100%">
					<tr>
						<th width="40%"><asp:Literal ID="VisualIDHeader" runat="server" Text="Visual ID" /></th>
						<th width="20%"><asp:Literal ID="StatusHeader" runat="server" Text="Status" /></th>
						<th width="40%"><asp:Literal ID="ChangeStatusHeader" runat="server" Text="Change Status" /></th>
					</tr>
				</table>
            </HeaderTemplate>
			<ItemTemplate>
				<hr size="1" noshade />
				<table width="100%">
					<tr>
						<td width="40%"><asp:Literal ID="VisualID" runat="server" /></td>
						<td width="20%"><asp:Literal ID="StatusLiteral" runat="server" /></td>
						<td align="center" width="40%">
							<asp:LinkButton ID="ManualReplenishLinkButton" runat="server" Enabled="False" Visible="false" OnClick="ManualReplenishLinkButton_OnClick" />
							<asp:LinkButton ID="CancelLinkButton" runat="server" Enabled="False" Visible="false" OnClick="CancelLinkButton_OnClick" />
							<asp:LinkButton ID="SuspendLinkButton" runat="server" Enabled="False" Visible="false" OnClick="SuspendLinkButton_OnClick" />
							<asp:LinkButton ID="ActivateLinkButton" runat="server" Enabled="False" Visible="false" OnClick="ActivateLinkButton_OnClick" />
						</td>
						
					</tr>
				</table>
			</ItemTemplate>
		</asp:Repeater>
	</div>
</asp:Content>