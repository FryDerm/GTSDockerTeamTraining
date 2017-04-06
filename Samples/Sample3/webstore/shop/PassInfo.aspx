<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" MaintainScrollPositionOnPostback="true" AutoEventWireup="true" Inherits="Gateway.WebStore.Shop.PassInfo" Title="Untitled Page" Codebehind="PassInfo.aspx.cs" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>
<%@ Reference Control="~/masterpage.master" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    
    <div data-replace="PassInfo"></div>

    <asp:PlaceHolder ID="PassDescriptionPlaceHolder" runat="server" Visible="false">
    <div class="PassDescription">
        <table>
            <tr>
                <td data-text="passDescription">
                    <asp:Literal ID="PassDescriptionLiteral" runat="server" />
                </td>
                <td data-text="passIndexDescription">
                    <asp:Literal ID="PassIndexDescriptionLiteral" runat="server" />
                </td>
            </tr>
        </table>
        </div>
    </asp:PlaceHolder>

    <asp:Panel ID="MyPanel" runat="server" DefaultButton="SaveButton">
    <div id="PassInfo">
        <asp:ScriptManager ID="ScriptManager1" runat="server" />
		<asp:PlaceHolder ID="PassInfoPlaceHolder" runat="server">
		<script language="javascript" type="text/javascript">
		//<!--
			window.onload = StoreCountryCodeSelection;

			var countryCodeHiddenField = '<%=CountryCodeHiddenField.ClientID%>';
			
			<% if (CountryDropDownList != null) 
			   { %>
			var countryCodeDropDownList = '<%=CountryDropDownList.ClientID%>';
			<% } 
			  else 
			  { %>
			var countryCodeDropDownList = '';
			<% } %>
			
			function StoreCountryCodeSelection() 
			{
				// If countryCodeDropDownList isn't defined
				if (countryCodeDropDownList == '')
				{
					return;
				}
				
				// Get the selected CountryCode
				var countryCtrl = document.getElementById(countryCodeDropDownList);
				var countryCtrlIndex = countryCtrl.selectedIndex;
				var countryCtrlValue = countryCtrl[countryCtrlIndex].value;
				
				// Set the selected CountryCode to the hidden field used to track it
				var countryHiddenCtrl = document.getElementById(countryCodeHiddenField);
				countryHiddenCtrl.value = countryCtrlValue;
			}
		//-->
		</script>
		
		<asp:HiddenField ID="CountryCodeHiddenField" runat="server" />
		
			<asp:GridView ID="PassInfoGridView" runat="server" AutoGenerateColumns="false" ShowHeader="false"
				DataKeyNames="Id" ShowFooter="false" GridLines="None" OnRowDataBound="PassInfoGridView_RowDataBound">
				<Columns>
				    
					<asp:BoundField  DataField="Label" ItemStyle-CssClass="PassFieldLabel" />
		            
					<asp:TemplateField>
					    <ItemTemplate>
							<asp:PlaceHolder ID="PassInfoResponsePlaceHolder" runat="server" />
						</ItemTemplate>
					</asp:TemplateField>
		            
					<asp:TemplateField>
						<ItemTemplate>
						<asp:HiddenField ID="FieldNumberHiddenField" runat="server" />
						<asp:PlaceHolder ID="PassInfoRequiredFieldValidatorPlaceHolder" runat="server" />
						</ItemTemplate>
					</asp:TemplateField>
				</Columns>        
			</asp:GridView>
			<asp:CheckBox ID="PassAsBillingCheckBox" runat="server" /><br /><br />
			<asp:Panel ID="PassPhotoPanel" runat="server" Visible="false">
				<div id="FileUpload">
					<table>
						<tr>
							<td >
								<b><asp:Label ID="PhotoUploadTitleLabel" runat="server" /></b><br />
								<asp:Label ID="PhotoUploadDescriptionLabel" runat="server" /><br /><br />
								<asp:Label ID="InvalidPhotoError" runat="server" CssClass="photo-error" Visible="False"/><br /><br />
								<CuteWebUI:Uploader
									runat="server"
									ID="FileUploader"
									OnFileUploaded="FileUploader_FileUploaded"
									ShowProgressBar="true" ShowFrameBrowseButton="true" 
									ShowProgressInfo="true"
									InsertButtonID="UploadButton">
									<ValidateOption AllowedFileExtensions="jpeg,jpg" />
								</CuteWebUI:Uploader>
								<asp:Button ID="UploadButton" runat="server" />
							</td>
							<td align="center">
								<asp:Label ID="NoImageLabel" runat="server" CssClass="NoImageLabel" />
								<asp:Image ID="PassImage" runat="server" Visible="false" />
								<br /><br />
								<asp:Button ID="ClearPhotoButton" runat="server" Visible="false" OnClick="ClearPhotoButton_Click" />
							</td>
						</tr>
					</table>
				</div>
				<br />
			</asp:Panel>

            <div id="passInfoButtons">
                <div id="passInfoCancelButton"><asp:Button ID="CancelButton" runat="server" OnClick="CancelButton_OnClick" Visible="false" /></div>
                <div id="passInfoSaveButton"><asp:Button ID="SaveButton" runat="server" OnClick="SaveButton_OnClick" /></div>
                <div id="passInfoAddmembersButton"><asp:Button ID="AddMembersButton" runat="server" OnClick="AddMembersButton_OnClick" Visible="false" /></div>
            </div>

		</asp:PlaceHolder>
        </div>
		</asp:Panel>
</asp:Content>