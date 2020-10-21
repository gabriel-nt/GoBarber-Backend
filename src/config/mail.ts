interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            name: string;
            email: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'etheral',
    defaults: {
        from: {
            email: 'teste@teste.com',
            name: 'Teste teste',
        },
    },
} as IMailConfig;
