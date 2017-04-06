<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="DebitInfo.aspx.cs" Inherits="Gateway.WebStore.shop.DebitInfo" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
<div id="Debit">
    <table>
        <tr>
            <td colspan="2">
            <asp:Panel ID="DebitInfoPanel" runat="server" DefaultButton="ContinueButton">
            <asp:GridView ID="DebitGridView" runat="server"
                DataKeyNames="OrderLineID"
                AutoGenerateColumns="false"  
	            GridLines="None" 
                CssClass="DebitTable"
		        onrowdatabound="DebitGridView_RowDataBound" >    
                <Columns>
                    <asp:TemplateField HeaderStyle-CssClass="DebitHeaderDescriptionCell" ItemStyle-CssClass="DebitDescriptionNameCell">
                        <HeaderTemplate>
                            <asp:Literal ID="DescriptionHeadingLiteral" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
                            <asp:Literal ID="DescriptionLiteral" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderStyle-CssClass="DebitHeaderPriceCell" ItemStyle-CssClass="DebitPriceCell">
                        <HeaderTemplate>
                            <asp:Literal ID="PriceHeadingLiteral" runat="server" />
                        </HeaderTemplate>
                        <ItemTemplate>
       						<asp:HiddenField ID="OrderLineIDHiddenField" runat="server" />
    			            <cc1:NumericTextBox ID="PriceTextBox" MaxLength="5" Width="50" AllowDecimal="true" DecimalPlaces="2" runat="server" />
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField>
                        <ItemTemplate>                            
                            <asp:RequiredFieldValidator ID="PriceRequiredFieldValidator" runat="server"
                                ControlToValidate="PriceTextBox"
                                EnableClientScript="false"
                                Display="Dynamic" />
                            <asp:CustomValidator ID="PriceValidator" runat="server"
                                ControlToValidate="PriceTextBox"
                                OnServerValidate="Price_ServerValidate"
                                EnableClientScript="false"
                                Display="Dynamic"
                                Enabled="false" />
                        </ItemTemplate>
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
            </asp:Panel>
            </td>
        </tr>
        <tr>
            <td><asp:Button ID="CancelButton" runat="server" OnClick="CancelButton_OnClick" />
        	&nbsp;<asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_Click" /></td>
	    </tr>
    </table>
</div>
</asp:Content>
