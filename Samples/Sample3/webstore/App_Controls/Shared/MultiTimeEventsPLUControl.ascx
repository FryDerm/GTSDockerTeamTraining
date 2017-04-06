<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MultiTimeEventsPLUControl.ascx.cs" Inherits="Gateway.Web.UI.Controls.MultiTimeEventsPLUControl" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>

<div>
	<div id="MultiTimeEventsPLUControl">
					
					<asp:Repeater ID="MultiTimeEventsPLURepeater" runat="server" OnItemDataBound="MultiTimeEventsPLURepeater_ItemDataBound">
						<HeaderTemplate>
							<table  cellpadding="6" cellspacing="0">
								
								
						</HeaderTemplate>
						<ItemTemplate>
							<tr id="MultiTimeEventTimeRow" data-object-key="selectedTimes">
								<td><span data-el="sales-channel-detail-id"><asp:HiddenField ID="SalesChannelDetailIDHiddenField" runat="server" /></span>
                                <span data-text="date-time"><asp:Literal ID="MultiTimeEventPLUDateTimeLiteral" runat="server" /></span></td>
								<td data-text="plu-name"><asp:Literal ID="MultiTimeEventPLUNameLiteral" runat="server" /></td>								
								<td data-el="quantity"><asp:TextBox ID="MultiTimeEventPLUQuantityTextBox" ReadOnly="true" Columns="1" MaxLength="4" runat="server" />                                

								</td>
							</tr>							
						</ItemTemplate>                        
						<FooterTemplate>
							</table>
						</FooterTemplate>                        
					</asp:Repeater>
				</div>
	
</div>