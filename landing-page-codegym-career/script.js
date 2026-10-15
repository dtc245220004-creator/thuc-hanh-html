document.addEventListener('DOMContentLoaded', function () {
  // Smoothly close the mobile navigation after selecting a section.
  document.querySelectorAll('#mainNav .nav-link, #mainNav .btn').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.jQuery && window.innerWidth < 992) {
        window.jQuery('#mainNav').collapse('hide');
      }
    });
  });

  // Back-to-top control.
  var backToTop = document.getElementById('backToTop');
  function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle('visible', window.scrollY > 420);
  }
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  }

  // Demo-only client-side validation: this form does not submit personal data.
  var form = document.getElementById('consultationForm');
  var message = document.getElementById('formMessage');
  if (form && message) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      message.className = 'form-message';
      message.textContent = '';

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        message.classList.add('error');
        message.textContent = 'Bạn hãy kiểm tra và điền đầy đủ các trường thông tin hợp lệ nhé.';
        form.querySelector(':invalid')?.focus();
        return;
      }

      var name = document.getElementById('fullName').value.trim();
      message.classList.add('success');
      message.textContent = 'Cảm ơn ' + name + '! Đây là bản demo giao diện; dữ liệu chưa được gửi đi.';
      form.reset();
      form.classList.remove('was-validated');
      if (window.jQuery && window.jQuery.fn.materialSelect) {
        window.jQuery('.mdb-select').materialSelect('destroy');
      }
    });
    form.querySelectorAll('input, select').forEach(function (field) {
      field.addEventListener('input', function () {
        if (message.textContent) {
          message.textContent = '';
          message.className = 'form-message';
        }
      });
    });
  }
});
