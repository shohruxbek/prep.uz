$(document).ready(function() {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    }
  });

  function initTinymce() {
    tinymce.init({
      menubar: false,
      selector: "textarea.tinymce",
      min_height: 300,
      resize: "vertical",
      plugins:
        "link, image, code, youtube, giphy, table, textcolor, lists, tiny_mce_wiris, codesample",
      extended_valid_elements:
        "input[id|name|value|type|class|style|required|placeholder|autocomplete|onclick]",
      toolbar:
        "styleselect bold italic underline | forecolor backcolor | alignleft aligncenter alignright | bullist numlist outdent indent | superscript subscript | link image table youtube giphy tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry codesample code |",
      images_upload_url: "/upload-image",
      images_upload_handler: function(blobInfo, success, failure) {
        if (blobInfo.blob().size > 100000) {
          failure("File hajmi 100KB dan yuqori bo'lmasligi kerak ");
        } else {
          var xhr, formData;
          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open("POST", "/upload-image");

          xhr.onload = function() {
            var json;

            if (xhr.status != 200) {
              failure("HTTP Error: " + xhr.status);
              return;
            }

            json = JSON.parse(xhr.responseText);

            if (!json || typeof json.location != "string") {
              failure("Invalid JSON: " + xhr.responseText);
              return;
            }

            success(json.location);
          };

          formData = new FormData();
          formData.append("file", blobInfo.blob(), blobInfo.filename());
          xhr.send(formData);
        }
      },

      init_instance_callback: function(editor) {
        if (typeof tinymce_init_callback !== "undefined") {
          tinymce_init_callback(editor);
        }
      }
    });
  }
  initTinymce();
});
