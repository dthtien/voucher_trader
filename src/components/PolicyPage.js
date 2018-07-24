import React, { Component } from 'react';

class PolicyPage extends Component {
  componentDidMount(){
    document.title="Chợ voucher - Chính sách quyền riêng tư"
  }

  render() {
    return (
      <div className='container mt-2'>
        <h1 className='text-center font-weight-bold mb-2'>
          Chính sách quyền riêng tư
        </h1>
        <p>Bằng việc đăng ký và sử dụng Tài khoản trên website Chợ Voucher, bạn đồng ý cho phép Chợ voucher thu thập, sử dụng và chia sẻ thông tin cá nhân để tăng chất lượng dịch vụ và phục vụ bạn tốt hơn. Việc thu thập, sử dụng và chia sẻ thông tin cá nhân được quy định tại “Quy chế hoạt động” của chovoucher.com và được triển khai cụ thể trong tài liệu dưới đây.
        </p>
        <h4 className='font-weight-bold'>
          1. Chúng tôi thu thập những thông tin nào?
        </h4>
      <ul>
        <li>Khi bạn đăng ký hoặc đăng tin trên website Chợ Voucher, chúng tôi sẽ yêu cầu bạn cung cấp các thông tin cá nhân sau:
          <ul>
            <li>Họ và tên thật</li>
            <li>Địa chỉ email (bạn đang sở hữu hợp pháp và đang hoạt động)</li>
            <li>Số điện thoại di động (bạn đang sở hữu hợp pháp và đang hoạt động)</li>
            <li>Địa chỉ</li>
          </ul>
        </li>
        <li>Ngoài ra hệ thống của chúng tôi sẽ tự động thu thập các thông tin sau từ máy tính của bạn:
          <ul>
            <li>Địa chỉ IP</li>
            <li>Các thông tin về trình duyệt</li>
            <li>Các địa chỉ bạn đã truy cập trên website Chợ Voucher.</li>
            <li>Thời gian bạn hoạt động trên website Chợ Voucher.</li>
          </ul>
        </li>
      </ul>
      <h4 className='font-weight-bold'>2. Mục đích thu thập thông tin cá nhân</h4>
      <ul>
        <li>Liên hệ với bạn để hỗ trợ bạn việc đăng tin</li>
        <li>Cung cấp cho người mua như thông tin chính thức để liên hệ với bạn khi bán hàng</li>
        <li>Kiểm tra &amp; đánh giá dữ liệu trên trang website Chợ Voucher.</li>
        <li>Nhận diện người dùng &amp; quản lý thông tin tài khoản</li>
        <li>Nghiên cứu và phân tích thông tin nhân khẩu học</li>
        <li>Gửi các thông báo mà chúng tôi cho rằng cần thiết hoặc bạn sẽ quan tâm, trừ khi bạn từ chối nhận những thông báo này</li>
        <li>Phân tích và đánh giá giúp cải thiện và nâng cấp dịch vụ.</li>
      </ul>
      <h4 className='font-weight-bold'>3. Các trường hợp chia sẻ thông tin cá nhân</h4>
      <p>Chúng tôi có thể chia sẻ các thông tin của bạn cho bên thứ ba dưới dạng nặc danh. Các bên thứ ba được sẽ chỉ được sử dụng để thu thập, cung cấp thông tin của bạn cho chúng tôi, và sử dụng dữ liệu của bạn dưới sự cho phép của chúng tôi.</p>
      <p>Các bên thứ 3 bao gồm:</p>
      <ul>
        <li>Các dịch vụ theo dõi &amp; phân tích dữ liệu</li>
        <li>Các dịch vụ liên quan đến việc gửi nhận thông báo (bằng SMS, email, cuộc gọi) tới bạn</li>
        <li>Các đối tác marketing</li>
        <li>Các đơn vị được chỉ định bởi cơ quan pháp luật Việt Nam</li>
        <li>Các đơn vị được chúng tôi yêu cầu để bảo vệ an toàn &amp; an ninh cho dịch vụ</li>
      </ul>
      <h4 className='font-weight-bold'>4. Cookies</h4>
      <p>Trang web của Chợ Voucher sử dụng cookie để Người dùng không phải nhập thông tin đăng nhập của mình mỗi lần vào Trang web.</p>
      <p>Thông tin duy nhất mà cookie có thể chứa là thông tin mà chính người dùng cung cấp. Một tập cookie không thể đọc dữ liệu bên ngoài ổ cứng của người dùng hoặc đọc các tập cookie được tạo ra bởi các trang web khác.</p>
      <p>Khi truy cập và sử dụng website Chợ Voucher, bạn đồng ý cho chúng tôi sử dụng Cookie để lưu trữ thông tin trên thiết bị của bạn.</p>
      <h4 className='font-weight-bold'>5. Truy cập và thay đổi thông tin cá nhân</h4>
      <ul>
        <li>Bạn có thể xem và thay đổi các thông tin cá nhân tại trang Hồ sơ cá nhân.</li>
        <li>Bạn có thể yêu cầu truy cập các thông tin khác chúng tôi thu thập từ bạn, bằng cách liên hệ với chúng tôi qua hoặc email được công bố ở dưới.</li>
        <li>Bạn có thể yêu cầu chấm dứt việc sử dụng thông tin cá nhân bằng cách liên hệ với chúng tôi qua hoặc email được công bố ở dưới.</li>
        <li>Chúng tôi có thể từ chối bạn yêu cầu truy cập thông tin cá nhân nếu:
        <ul>
          <li>Thông tin chỉ dùng với mục đích phân tích và đánh giá</li>
          <li>Thông tin sử dụng cho mục đích giải quyết tranh chấp (ví dụ: thông tin cá nhân của người khác/đối tượng tranh chấp)</li>
          <li>Thông tin tổn hại đến hoạt động thương mại &amp; cạnh tranh của chúng tôi</li>
          <li>Chi phí, công sức cho việc cung cấp dữ liệu này không tương xứng với lợi ích nhận được của chúng tôi hoặc của bạn</li>
        </ul>
        </li>
        <li>Chúng tôi có quyền xác định thông tin nào nằm trong phạm vi có thể từ chối.</li>
      </ul>
      <h4 className='font-weight-bold'>6. Các phương thức bảo vệ thông tin cá nhân</h4>
      <ul>
        <li>Chúng tôi đảm bảo rằng mọi thông tin thu thập được sẽ được lưu giữ an toàn, bằng các phương thức sau:
          <ul>
            <li>Giới hạn truy cập thông tin cá nhân bằng việc Đăng ký tài khoản</li>
            <li>Sử dụng sản phẩm công nghệ để ngăn chặn truy cập máy tính trái phép</li>
            <li>Xóa thông tin cá nhân của quý khách khi nó không còn cần thiết cho mục đích lưu trữ hồ sơ của chúng tôi</li>
          </ul>
        </li>
        <li>Chúng tôi sử dụng công nghệ mã hóa theo giao thức 128-bit SSL (secure sockets layer) khi xử lý tài khoản của bạn.</li>
      </ul>
      <h4 className='font-weight-bold'>7. Thay đổi Chính sách riêng tư</h4>
      <p>Chúng tôi có quyền thay đổi, cập nhật các chính sách thông tin bất kỳ lúc nào. Việc thay đổi này sẽ được thông báo trên website của chúng tôi.</p>
      <h4 className='font-weight-bold'>8. Thông tin thêm</h4>
      <p>Nếu bạn muốn: truy cập, thay đổi hoặc xóa thông tin cá nhân, khiếu nại hoặc muốn có thêm thông tin, vui lòng liên hệ với chúng tôi qua:</p>
      <p>Email: chovoucher.com@gmail.com</p>

      </div>
    );
  }
}

export default PolicyPage;
