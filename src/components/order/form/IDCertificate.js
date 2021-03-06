export const idCertificateForm = {
  title: "IdentityCertificate",
  steps: 7,
  content: [
    {
      title: "uploadIDFiles",
      content: [
        {
          key: "files",
          type: "fileHandler",
          fileType: "documents"
        }
      ]
    },
    {
      title: "personalInfo",
      content: [
        {
          key: "nationalId",
          type: "text"
        },
        {
          key: "certificateId",
          type: "text"
        },
        {
          key: "serial",
          type: "text"
        },
        {
          key: "name",
          type: "text"
        },
        {
          key: "lastName",
          type: "text"
        },
        {
          key: "birthDate",
          type: "date"
        },
        {
          key: "birthLocation",
          type: "text"
        },
        {
          key: "registrationLocation",
          type: "text"
        },
        {
          key: "registrationDate",
          type: "date"
        }
      ]
    },
    {
      title: "parentsInfo",
      content: [
        {
          key: "fatherName",
          type: "text"
        },
        {
          key: "fatherId",
          type: "text"
        },
        {
          key: "fatherRegistrationLocation",
          type: "text"
        },
        {
          key: "motherName",
          type: "text"
        },
        {
          key: "motherId",
          type: "text"
        },
        {
          key: "motherRegistrationLocation",
          type: "text"
        }
      ]
    },
    {
      title: "spousesInfo",
      content: [
        {
          key: "spouses",
          type: "spouses"
        }
      ]
    },
    {
      title: "childrenInfo",
      content: [
        {
          key: "children",
          type: "children"
        }
      ]
    },
    {
      title: "description",
      content: [
        {
          key: "description",
          type: "text",
          grid: 12,
          notRequired: true
        }
      ]
    },
    {
      title: "address",
      content: [
        {
          key: "address",
          grid: 12,
          type: "text"
        }
      ]
    }
  ]
};
