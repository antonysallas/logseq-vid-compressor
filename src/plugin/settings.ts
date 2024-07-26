import { LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';
import { settingsConfig } from './settingsConfig';
import './settings.css';

export const settingsLoad = () => {
    logseq.useSettingsSchema(settingsConfig);

    // Listen for settings changes
    logseq.onSettingsChanged((settings, oldSettings) => {
        onSettingsChangedCallback(settings, oldSettings);
    });
}

const onSettingsChangedCallback = (settings: LSPluginBaseInfo['settings'], oldSettings: LSPluginBaseInfo['settings']) => {
    const compressionLevel = (settings.compressionLevel || 'Medium') as string;
    updateCompressionSettings(compressionLevel);
}

const updateCompressionSettings = (level: string) => {
    let crfValue;
    switch (level) {
        case 'High':
            crfValue = 23;
            break;
        case 'Medium':
            crfValue = 28;
            break;
        case 'Low':
            crfValue = 35;
            break;
        default:
            crfValue = 28;
    }
    // Update the ffmpeg command with the new crf value
    // This is a placeholder, replace with actual logic
    console.log(`Compression level set to ${level}, CRF value: ${crfValue}`);
}
