import React, { useState } from "react";

const CMSSettingsPanel = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeCategory, setActiveCategory] = useState("access");
  const [expandedCategory, setExpandedCategory] = useState("access");
  const [settings, setSettings] = useState({
    // Access & Permissions
    twoFactorAuth: false,
    sessionTimeout: "30",
    apiAccess: true,
    
    // Content Models
    autoSave: true,
    versionControl: true,
    contentValidation: false,
    defaultLanguage: "en",
    
    // Publishing & Workflow
    publishMethod: "manual",
    enableDrafts: true,
    scheduledPublishing: false,
    workflowApproval: false,
    
    // Integrations
    webhooks: false,
    analyticsTracking: true,
    socialMediaSync: false,
    emailNotifications: true,
    
    // API & Developer Tools
    apiRateLimit: "1000",
    enableGraphQL: false,
    debugMode: false,
    
    // UI Preferences
    livePreview: true,
    editorLayout: "split",
    enableSnapshots: false,
    
    // Billing
    autoRenewal: true,
    usageAlerts: true,
    
    // Advanced
    experimentalFeatures: false,
    advancedCaching: false,
    customDomain: false
  });

  const categories = [
    { id: "access", title: "Access & Permissions" },
    { id: "content", title: "Content Models" },
    { id: "publishing", title: "Publishing & Workflow" },
    { id: "integrations", title: "Integrations" },
    { id: "api", title: "API & Developer Tools" },
    { id: "ui", title: "UI Preferences" },
    { id: "billing", title: "Billing & Subscription" },
    { id: "advanced", title: "Advanced & Experimental" },
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">
          {label}
        </div>
        {description && (
          <div className="text-xs mt-1 text-gray-500">
            {description}
          </div>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-[var(--settings-accent)]' : 'bg-gray-400'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  const SelectField = ({ value, onChange, options, label, description }) => (
    <div className="p-4 border-b border-gray-200">
      <div className="text-sm font-medium mb-2 text-gray-900">
        {label}
      </div>
      {description && (
        <div className="text-xs mb-3 text-gray-500">
          {description}
        </div>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white text-gray-900"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderAccessSettings = () => (
    <div className="space-y-0 bg-gradient-to-r from-gray-50 to-white">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-1 h-6 bg-[var(--settings-accent)] rounded"></div>
          <h3 className="text-lg font-semibold text-gray-900">
            Security Settings
          </h3>
        </div>
        <p className="text-sm text-gray-500 ml-3">
          Configure account security and authentication
        </p>
      </div>

      <ToggleSwitch
        checked={settings.twoFactorAuth}
        onChange={(value) => updateSetting("twoFactorAuth", value)}
        label="Two-Factor Authentication"
        description="Require 2FA for account access and sensitive operations"
      />

      <SelectField
        value={settings.sessionTimeout}
        onChange={(value) => updateSetting("sessionTimeout", value)}
        options={[
          { value: "15", label: "15 minutes" },
          { value: "30", label: "30 minutes" },
          { value: "60", label: "1 hour" },
          { value: "240", label: "4 hours" },
          { value: "never", label: "Never" }
        ]}
        label="Session Timeout"
        description="Automatically log out users after period of inactivity"
      />

      <ToggleSwitch
        checked={settings.apiAccess}
        onChange={(value) => updateSetting("apiAccess", value)}
        label="API Access"
        description="Allow programmatic access to your content via API"
      />

      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-1 h-6 bg-blue-400 rounded"></div>
          <h3 className="text-lg font-semibold text-gray-900">
            Team Members
          </h3>
        </div>
        <p className="text-sm text-gray-500 ml-3">
          Invite and manage users, assign predefined roles
        </p>
        <div className="space-y-3 mb-4">
          {[
            { name: "John Doe", email: "john@company.com", role: "Admin", status: "Active" },
            { name: "Jane Smith", email: "jane@company.com", role: "Editor", status: "Active" },
            { name: "Mike Wilson", email: "mike@company.com", role: "Contributor", status: "Pending" }
          ].map((member) => (
            <div key={member.email} className="flex items-center justify-between p-3 rounded bg-gray-100">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{member.name}</div>
                <div className="text-xs text-gray-500">{member.email}</div>
              </div>
              <div className="text-right">
                <div className={`text-xs px-2 py-1 rounded text-white ${
                  member.status === "Active" ? 'bg-[var(--settings-accent)]' : 'bg-gray-400'
                }`}>
                  {member.role}
                </div>
                <div className="text-xs mt-1 text-gray-500">
                  {member.status}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-[var(--settings-accent)] text-white hover:bg-[var(--settings-accent)]"
        >
          Invite Team Member
        </button>
      </div>

      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-1 h-6 bg-green-400 rounded"></div>
          <h3 className="text-lg font-semibold text-gray-900">
            Role Editor
          </h3>
        </div>
        <p className="text-sm text-gray-500 ml-3">
          Create or edit custom roles with fine-grained access control
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium border border-red-400 transition-colors text-[var(--settings-text)] bg-transparent hover:bg-red-50"
          >
            Create New Role
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 transition-colors text-gray-700 bg-transparent hover:bg-gray-50"
          >
            Edit Existing Roles
          </button>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-1 h-6 bg-purple-400 rounded"></div>
          <h3 className="text-lg font-semibold text-gray-900">
            Activity Logs
          </h3>
        </div>
        <p className="text-sm text-gray-500 ml-3 mb-4">
          View user activity history for audit and collaboration tracking
        </p>
        <div className="text-xs font-medium mb-2 text-gray-900">
          Recent Activity
        </div>
        <div className="space-y-2">
          {[
            { user: "John Doe", action: "Updated blog post 'Getting Started'", time: "2 hours ago" },
            { user: "Jane Smith", action: "Created new page 'About Us'", time: "4 hours ago" },
            { user: "Mike Wilson", action: "Invited team member", time: "1 day ago" },
            { user: "System", action: "Automated backup completed", time: "1 day ago" }
          ].map((activity, index) => (
            <div key={index} className="flex justify-between items-center p-2 rounded bg-gray-100">
              <div className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span> {activity.action}
              </div>
              <div className="text-xs text-gray-500">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUISettings = () => (
    <div className="space-y-0">
      <ToggleSwitch
        checked={settings.livePreview}
        onChange={(value) => updateSetting("livePreview", value)}
        label="Live Preview"
        description="Enable preview panel for real-time content rendering"
      />

      <SelectField
        value={settings.editorLayout}
        onChange={(value) => updateSetting("editorLayout", value)}
        options={[
          { value: "split", label: "Split View" },
          { value: "fullscreen", label: "Fullscreen Editor" },
          { value: "card", label: "Card-based Layout" }
        ]}
        label="Editor Layout"
        description="Choose between split, fullscreen, or card-based layout"
      />

      <ToggleSwitch
        checked={settings.enableSnapshots}
        onChange={(value) => updateSetting("enableSnapshots", value)}
        label="Enable Snapshots"
        description="Automatically save content snapshots for recovery"
      />

      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-1 text-gray-900">
          Field Order
        </h3>
        <p className="text-sm mb-4 text-gray-500">
          Customize the field display order in the content editing form
        </p>
        <div className="space-y-2">
          {["Title", "Content", "Featured Image", "Meta Description", "Tags"].map((field) => (
            <div key={field} className="flex items-center justify-between p-3 rounded border border-gray-300 bg-white">
              <span className="text-sm text-gray-900">{field}</span>
              <div className="text-xs text-gray-400">
                ⋮⋮
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContentSettings = () => (
    <div className="space-y-0">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-1 text-gray-900">
          Content Types
        </h3>
        <p className="text-sm mb-4 text-gray-500">
          Manage and configure content models for your CMS
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-[var(--settings-accent)] text-white hover:bg-[var(--settings-primary)]"
          >
            Create Content Type
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 transition-colors text-gray-700 bg-white hover:bg-gray-50"
          >
            Import Schema
          </button>
        </div>
      </div>

      <ToggleSwitch
        checked={settings.autoSave}
        onChange={(value) => updateSetting("autoSave", value)}
        label="Auto-save Content"
        description="Automatically save content changes as you type"
      />

      <ToggleSwitch
        checked={settings.versionControl}
        onChange={(value) => updateSetting("versionControl", value)}
        label="Version Control"
        description="Enable content versioning and revision history"
      />

      <ToggleSwitch
        checked={settings.contentValidation}
        onChange={(value) => updateSetting("contentValidation", value)}
        label="Content Validation"
        description="Validate content against defined schemas before saving"
      />

      <SelectField
        value={settings.defaultLanguage}
        onChange={(value) => updateSetting("defaultLanguage", value)}
        options={[
          { value: "en", label: "English" },
          { value: "es", label: "Spanish" },
          { value: "fr", label: "French" },
          { value: "de", label: "German" },
          { value: "zh", label: "Chinese" }
        ]}
        label="Default Language"
        description="Set the default language for new content"
      />
    </div>
  );

  const renderPublishingSettings = () => (
    <div className="space-y-0">
      <SelectField
        value={settings.publishMethod}
        onChange={(value) => updateSetting("publishMethod", value)}
        options={[
          { value: "manual", label: "Manual Publishing" },
          { value: "scheduled", label: "Scheduled Publishing" },
          { value: "automatic", label: "Auto-publish on Save" }
        ]}
        label="Default Publishing Method"
        description="Choose how content should be published by default"
      />

      <ToggleSwitch
        checked={settings.enableDrafts}
        onChange={(value) => updateSetting("enableDrafts", value)}
        label="Enable Draft Mode"
        description="Allow saving content as drafts before publishing"
      />

      <ToggleSwitch
        checked={settings.scheduledPublishing}
        onChange={(value) => updateSetting("scheduledPublishing", value)}
        label="Scheduled Publishing"
        description="Enable scheduling content for future publication"
      />

      <ToggleSwitch
        checked={settings.workflowApproval}
        onChange={(value) => updateSetting("workflowApproval", value)}
        label="Workflow Approval"
        description="Require approval before content can be published"
      />

      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-1 text-gray-900">
          Publishing Workflow
        </h3>
        <p className="text-sm mb-4 text-gray-500">
          Configure multi-stage publishing workflow
        </p>
        <div className="space-y-2">
          {["Draft", "Review", "Approved", "Published"].map((stage, index) => (
            <div key={stage} className="flex items-center justify-between p-3 rounded border border-gray-300 bg-white">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-[var(--settings-accent)] text-white">
                  {index + 1}
                </div>
                <span className="text-sm text-gray-900">{stage}</span>
              </div>
              <div className="text-xs text-gray-400">
                ⋮⋮
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-0">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-1 text-gray-900">
          Connected Services
        </h3>
        <p className="text-sm mb-4 text-gray-500">
          Manage third-party service integrations
        </p>
        <div className="space-y-3">
          {[
            { name: "Google Analytics", status: "Connected" },
            { name: "Mailchimp", status: "Disconnected" },
            { name: "Slack", status: "Connected" },
            { name: "Zapier", status: "Disconnected" }
          ].map((service) => (
            <div key={service.name} className="flex items-center justify-between p-3 rounded border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  service.status === "Connected" ? "bg-[var(--settings-accent)]" : "bg-gray-400"
                }`}></div>
                <span className="text-sm font-medium text-gray-900">{service.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  service.status === "Connected" 
                    ? "bg-[var(--settings-accent)] text-white" 
                    : "bg-gray-400 text-gray-700"
                }`}>
                  {service.status}
                </span>
              </div>
              <button className="text-xs px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
                {service.status === "Connected" ? "Configure" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <ToggleSwitch
        checked={settings.webhooks}
        onChange={(value) => updateSetting("webhooks", value)}
        label="Webhook Notifications"
        description="Send HTTP notifications on content changes"
      />

      <ToggleSwitch
        checked={settings.analyticsTracking}
        onChange={(value) => updateSetting("analyticsTracking", value)}
        label="Analytics Tracking"
        description="Enable automatic analytics tracking for published content"
      />

      <ToggleSwitch
        checked={settings.socialMediaSync}
        onChange={(value) => updateSetting("socialMediaSync", value)}
        label="Social Media Sync"
        description="Automatically share published content to social platforms"
      />

      <ToggleSwitch
        checked={settings.emailNotifications}
        onChange={(value) => updateSetting("emailNotifications", value)}
        label="Email Notifications"
        description="Receive email notifications for important events"
      />
    </div>
  );

  const renderAPISettings = () => (
    <div className="space-y-0">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-1 text-gray-900">
          API Keys
        </h3>
        <p className="text-sm mb-4 text-gray-500">
          Manage API keys and access tokens
        </p>
        <div className="space-y-3">
          {[
            { name: "Production API Key", key: "pk_live_•••••••••••••••••••••", created: "Jan 15, 2024" },
            { name: "Development API Key", key: "pk_test_•••••••••••••••••••••", created: "Jan 10, 2024" }
          ].map((apiKey) => (
            <div key={apiKey.name} className="p-3 rounded border border-gray-300 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{apiKey.name}</span>
                <button className="text-xs px-3 py-1 rounded border border-gray-300 text-gray-700">
                  Regenerate
                </button>
              </div>
              <div className="text-xs text-gray-500">
                {apiKey.key}
              </div>
              <div className="text-xs mt-1 text-gray-400">
                Created: {apiKey.created}
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            backgroundColor: "var(--settings-accent)",
            color: "var(--settings-background)"
          }}
        >
          Generate New API Key
        </button>
      </div>

      <SelectField
        value={settings.apiRateLimit}
        onChange={(value) => updateSetting("apiRateLimit", value)}
        options={[
          { value: "100", label: "100 requests/hour" },
          { value: "1000", label: "1,000 requests/hour" },
          { value: "10000", label: "10,000 requests/hour" },
          { value: "unlimited", label: "Unlimited" }
        ]}
        label="API Rate Limit"
        description="Set the maximum number of API requests per hour"
      />

      <ToggleSwitch
        checked={settings.enableGraphQL}
        onChange={(value) => updateSetting("enableGraphQL", value)}
        label="Enable GraphQL API"
        description="Provide GraphQL endpoint in addition to REST API"
      />

      <ToggleSwitch
        checked={settings.debugMode}
        onChange={(value) => updateSetting("debugMode", value)}
        label="Debug Mode"
        description="Enable detailed API error messages and logging"
      />
    </div>
  );

  const renderBillingSettings = () => (
    <div className="space-y-0">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-1 text-gray-900">
          Current Plan
        </h3>
        <p className="text-sm mb-4 text-gray-500">
          Professional Plan - $49/month
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 rounded bg-gray-200">
            <div className="text-2xl font-bold text-[var(--settings-text)]">15</div>
            <div className="text-xs text-gray-500">Team Members</div>
          </div>
          <div className="text-center p-3 rounded bg-gray-200">
            <div className="text-2xl font-bold text-[var(--settings-text)]">50GB</div>
            <div className="text-xs text-gray-500">Storage Used</div>
          </div>
          <div className="text-center p-3 rounded bg-gray-200">
            <div className="text-2xl font-bold text-[var(--settings-text)]">8.5K</div>
            <div className="text-xs text-gray-500">API Calls</div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            style={{
              borderColor: "var(--settings-accent)",
              color: "var(--settings-accent)",
              backgroundColor: "var(--settings-background)"
            }}
          >
            Upgrade Plan
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            style={{
              borderColor: "var(--settings-secondary)",
              color: "var(--settings-text)",
              backgroundColor: "var(--settings-background)"
            }}
          >
            View Billing History
          </button>
        </div>
      </div>

      <ToggleSwitch
        checked={settings.autoRenewal}
        onChange={(value) => updateSetting("autoRenewal", value)}
        label="Auto-renewal"
        description="Automatically renew subscription before expiration"
      />

      <ToggleSwitch
        checked={settings.usageAlerts}
        onChange={(value) => updateSetting("usageAlerts", value)}
        label="Usage Alerts"
        description="Receive notifications when approaching plan limits"
      />

      <div className="p-4 border-gray-200">
        <h3 className="text-lg font-semibold mb-1 text-gray-900">
          Payment Method
        </h3>
        <p className="text-sm mb-4 text-gray-500">
          Manage your payment information
        </p>
        <div className="flex items-center justify-between p-3 rounded border border-gray-300 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-5 rounded bg-[var(--settings-accent)]"></div>
            <div>
              <div className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</div>
              <div className="text-xs text-gray-500">Expires 12/26</div>
            </div>
          </div>
          <button className="text-xs px-3 py-1 rounded border border-gray-300 text-gray-700">
            Update
          </button>
        </div>
      </div>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-0">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-1 text-gray-900">
          Experimental Features
        </h3>
        <p className="text-sm mb-4 text-gray-500">
          Enable cutting-edge features that are still in development
        </p>
        <div className="p-3 rounded border" style={{ 
          borderColor: "var(--settings-accent)", 
          backgroundColor: "rgba(255, 121, 111, 0.1)" 
        }}>
          <div className="text-xs font-medium mb-1 text-[var(--settings-text)]">⚠️ Warning</div>
          <div className="text-xs text-gray-900">Experimental features may be unstable and could affect your content.</div>
        </div>
      </div>

      <ToggleSwitch
        checked={settings.experimentalFeatures}
        onChange={(value) => updateSetting("experimentalFeatures", value)}
        label="Enable Experimental Features"
        description="Access beta features and experimental functionality"
      />

      <ToggleSwitch
        checked={settings.advancedCaching}
        onChange={(value) => updateSetting("advancedCaching", value)}
        label="Advanced Caching"
        description="Enable aggressive caching for improved performance"
      />

      <ToggleSwitch
        checked={settings.customDomain}
        onChange={(value) => updateSetting("customDomain", value)}
        label="Custom Domain"
        description="Use your own domain for the CMS interface"
      />

      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-1 text-gray-900">
          Data Export
        </h3>
        <p className="text-sm mb-4 text-gray-500">
          Export your content and settings data
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            style={{
              borderColor: "var(--settings-accent)",
              color: "var(--settings-accent)",
              backgroundColor: "var(--settings-background)"
            }}
          >
            Export Content
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            style={{
              borderColor: "var(--settings-secondary)",
              color: "var(--settings-text)",
              backgroundColor: "var(--settings-background)"
            }}
          >
            Export Settings
          </button>
        </div>
      </div>

      <div className="p-4 border-gray-200">
        <h3 className="text-lg font-semibold mb-1 text-[var(--settings-text)]">
          Danger Zone
        </h3>
        <p className="text-sm mb-4 text-gray-500">
          Irreversible and destructive actions
        </p>
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            backgroundColor: "var(--settings-accent)",
            color: "white"
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );

  const renderMobileCategories = () => (
    <div className="space-y-0">
      {categories.map((category) => {
        const isExpanded = expandedCategory === category.id;
        return (
          <div key={category.id} className="border-b border-gray-100">
            <button
              onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
              className={`w-full flex items-center justify-between p-4 text-left transition-all duration-200 ${
                isExpanded ? 'bg-red-50 border-l-4 border-l-[var(--settings-primary)]' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  isExpanded ? 'bg-[var(--settings-accent)]' : 'bg-gray-300'
                }`}></div>
                <span className={`text-base font-semibold ${
                  isExpanded ? 'text-red-[var(--settings-accent)]' : 'text-gray-900'
                }`}>
                  {category.title}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {isExpanded && (
                  <div className="bg-[var(--settings-accent)] text-white text-xs px-2 py-1 rounded-full font-medium">
                    Active
                  </div>
                )}
                <span 
                  className={`text-lg transition-transform duration-200 ${
                    isExpanded ? "rotate-180 text-[var(--settings-text)]" : "text-gray-400"
                  }`}
                >
                  ↓
                </span>
              </div>
            </button>
            {isExpanded && (
              <div className="bg-gray-50 border-l-4 border-l-[var(--settings-primary)]">
                <div className="pl-6 pr-4 pb-4">
                  {renderCurrentCategory(category.id)}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderCurrentCategory = (categoryId = activeCategory) => {
    switch (categoryId) {
      case "access":
        return renderAccessSettings();
      case "content":
        return renderContentSettings();
      case "publishing":
        return renderPublishingSettings();
      case "integrations":
        return renderIntegrationsSettings();
      case "api":
        return renderAPISettings();
      case "ui":
        return renderUISettings();
      case "billing":
        return renderBillingSettings();
      case "advanced":
        return renderAdvancedSettings();
      default:
        return renderAccessSettings();
    }
  };

  return (
    <div 
      className={`bg-gray-200 ${isMobileView ? "w-full max-w-sm mx-auto min-h-screen" : "min-h-screen"}`}
    >
      {isMobileView && (
        /* Mobile Device Frame */
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="w-full max-w-sm mx-auto h-full relative">
            <div className="absolute inset-0 border-4 border-gray-800 rounded-3xl shadow-2xl pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full"></div>
          </div>
        </div>
      )}
      
      <div className={isMobileView ? "relative z-30 mx-4 my-8 bg-white rounded-2xl overflow-hidden shadow-xl min-h-screen" : ""}>
        {/* Header with Device Toggle */}
        <div 
          className={`border-b border-gray-200 ${isMobileView ? "bg-white px-4 py-3" : "bg-gray-50 px-6 py-4"}`}
        >
        <div className={`flex items-center ${isMobileView ? "flex-col space-y-3" : "justify-between"}`}>
          <div className={isMobileView ? "text-center" : ""}>
            <h1 className={`${isMobileView ? "text-xl" : "text-2xl"} font-bold text-gray-900`}>
              CMS Settings
            </h1>
            <p className="text-sm mt-1 text-gray-500">
              {isMobileView ? "Configure your CMS" : "Configure your content management platform"}
            </p>
          </div>
          
          {/* Device Toggle */}
          <div className="flex items-center space-x-3">
            <span className={`text-sm text-gray-900 ${!isMobileView ? "font-medium" : ""}`}>
              Desktop
            </span>
            <button
              onClick={() => setIsMobileView(!isMobileView)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isMobileView ? 'bg-[var(--settings-accent)]' : 'bg-gray-400'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isMobileView ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm text-gray-900 ${isMobileView ? "font-medium" : ""}`}>
              Mobile
            </span>
          </div>
        </div>
      </div>

      {isMobileView ? (
        /* Mobile Expandable Categories */
        <div className="bg-white">
          {renderMobileCategories()}
        </div>
      ) : (
        /* Desktop Layout */
        <div className="flex min-h-screen">
          {/* Navigation */}
          <div 
            className="w-64 border-r border-gray-200 bg-gray-50"
          >
            <div className="p-4">
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === category.id 
                        ? 'bg-[var(--settings-accent)] text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 pb-20">
            <div className="max-w-4xl mx-auto">
              {renderCurrentCategory()}
            </div>
          </div>
        </div>
      )}

      {/* Save Actions Bar */}
      <div 
        className={`${isMobileView ? "relative" : "fixed bottom-0 left-0 right-0"} border-t border-gray-200 ${isMobileView ? "bg-white" : "bg-gray-50"} z-50 ${isMobileView ? "px-4 py-3" : "px-6 py-4"}`}
      >
        <div className={`flex items-center ${isMobileView ? "justify-center space-x-2" : "justify-end space-x-3"}`}>
          <button 
            className={`${isMobileView ? "px-3 py-2 text-xs" : "px-4 py-2 text-sm"} rounded-lg font-medium border border-gray-300 transition-colors text-gray-700 bg-white hover:bg-gray-50`}
          >
            {isMobileView ? "Discard" : "Discard Changes"}
          </button>
          <button 
            className={`${isMobileView ? "px-3 py-2 text-xs" : "px-4 py-2 text-sm"} rounded-lg font-medium transition-colors bg-[var(--settings-accent)] text-white hover:bg-[var(--settings-accent)]`}
          >
            {isMobileView ? "Save" : "Save Changes"}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CMSSettingsPanel;
