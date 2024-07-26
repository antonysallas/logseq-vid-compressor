import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';

export const settingsConfig: SettingSchemaDesc[] = [
    {
        key: 'compressionHeading',
        title: 'Compression Settings',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'compressionLevel',
        title: '',
        description: 'Choose compression level:',
        type: 'enum',
        enumPicker: 'radio',
        enumChoices: [
            'High',
            'Medium',
            'Low',
        ],
        default: 'Medium',
    }
];
